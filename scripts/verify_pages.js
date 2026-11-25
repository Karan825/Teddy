const { chromium } = require("playwright");
const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const http = require("http");

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;
const CLONE_DIR = path.resolve(__dirname, "..");
const SCREENSHOTS_DIR = path.join(CLONE_DIR, "verification_screenshots");

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(url, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve();
          } else {
            setTimeout(check, 400);
          }
        })
        .on("error", () => {
          if (Date.now() - start > timeoutMs) {
            reject(new Error("Server timeout waiting to boot"));
          } else {
            setTimeout(check, 400);
          }
        });
    }
    check();
  });
}

async function run() {
  console.log("Starting Next.js production server on port " + PORT + "...");
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: CLONE_DIR,
    stdio: "inherit",
    shell: true,
  });

  const cleanup = () => {
    try {
      if (server.pid) {
        if (process.platform === "win32") {
          execSync(`taskkill /pid ${server.pid} /T /F`);
        } else {
          server.kill();
        }
      }
    } catch {
      // ignore cleanup errors
    }
  };

  process.on("exit", cleanup);
  process.on("SIGINT", cleanup);
  process.on("SIGTERM", cleanup);

  try {
    await waitForServer(BASE_URL);
    console.log("Server is ready at " + BASE_URL);

    const browser = await chromium.launch({ headless: true });
    const consoleErrors = [];

    async function checkPage(urlPath, viewport, screenshotName, interactionFn = null) {
      console.log(`Checking ${urlPath} [${viewport.width}x${viewport.height}]...`);
      const context = await browser.newContext({
        viewport,
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();

      page.on("pageerror", (err) => {
        console.error(`Page error on ${urlPath}:`, err.message);
        consoleErrors.push({ urlPath, error: err.message });
      });

      await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);

      if (interactionFn) {
        await interactionFn(page);
      }

      const filePath = path.join(SCREENSHOTS_DIR, screenshotName);
      await page.screenshot({ path: filePath, fullPage: false });
      console.log(`  Saved screenshot: ${screenshotName}`);
      await context.close();
    }

    // 1. Homepage Desktop (1440px) - Hero + Scroll Path + Meet Sticky Horizontal Scroll
    await checkPage("/", { width: 1440, height: 900 }, "01-home-desktop-1440.png", async (page) => {
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01-home-hero-top.png") });
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01b-home-scroll-walk.png") });
      await page.evaluate(() => window.scrollTo(0, 1500));
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01c-home-meet-pinned.png") });
      await page.evaluate(() => {
        document.querySelector(".tp-paths")?.scrollIntoView({ behavior: "instant" });
      });
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01d-home-paths.png") });
      await page.evaluate(() => {
        document.querySelector(".tp-chat")?.scrollIntoView({ behavior: "instant" });
      });
      await page.waitForTimeout(350);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01e-home-chat.png") });
      await page.evaluate(() => {
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await page.waitForTimeout(450);
      await page.screenshot({ path: path.join(SCREENSHOTS_DIR, "01f-home-footer.png") });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(250);
    });

    // 2. Homepage Tablet & Mobile
    await checkPage("/", { width: 768, height: 1024 }, "02-home-tablet-768.png");
    await checkPage("/", { width: 390, height: 844 }, "03-home-mobile-390.png");

    // 3. Other routes
    await checkPage("/puppies", { width: 1440, height: 900 }, "04-puppies-desktop.png");
    await checkPage("/puppies", { width: 390, height: 844 }, "05-puppies-mobile.png");
    await checkPage("/puppies/copper-male", { width: 1440, height: 900 }, "06-puppy-detail-desktop.png");
    await checkPage("/happy-families", { width: 1440, height: 900 }, "08-happy-families-desktop.png");
    await checkPage("/how-it-works", { width: 1440, height: 900 }, "09-how-it-works-desktop.png");
    await checkPage("/faq", { width: 1440, height: 900 }, "10-faq-desktop.png");
    await checkPage("/contact", { width: 1440, height: 900 }, "11-contact-desktop.png");
    await checkPage("/gone-home", { width: 1440, height: 900 }, "12-gone-home-desktop.png");

    await browser.close();

    console.log("\n================ VERIFICATION SUMMARY ================");
    console.log(`Console errors encountered: ${consoleErrors.length}`);
    console.log("======================================================\n");
  } finally {
    cleanup();
  }
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
