const entries = [
  {
    title: "Vet-checked & healthy",
    text: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.",
    stampClass: "tp-stamp--round",
    ink: "#a24a1a",
    tilt: "-8deg",
    icon: (
      <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
        <path
          d="M32 54C16 43 8 34 8 24c0-7 5.4-12 12-12 5 0 9 3 12 7 3-4 7-7 12-7 6.6 0 12 5 12 12 0 10-8 19-24 30z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M22 30h7l3-7 4 13 3-6h7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    title: "Korea to Dubai, safely",
    text: "Trusted breeders, safe travel, and premium care from start to finish.",
    stampClass: "tp-stamp--ticket",
    ink: "#1f6b45",
    tilt: "5deg",
    icon: (
      <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
        <path
          d="M6 36l22-3 12-17h6l-6 17 12-1 6-7h3l-2 10 2 10h-3l-6-7-12-1 6 17h-6L28 37 6 36z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M8 50c10 4 20 4 30 0"
          fill="none"
          stroke="currentColor"
          strokeDasharray="2 7"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    title: "Support 24/7",
    text: "Always here to help, from choosing your puppy to post-delivery support.",
    stampClass: "tp-stamp--oval",
    ink: "#5a3a28",
    tilt: "-4deg",
    icon: (
      <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
        <path
          d="M10 14h44v28H30l-12 10v-10h-8z"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M22 28h0M32 28h0M42 28h0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="5"
        />
      </svg>
    ),
  },
  {
    title: "Trusted by families worldwide",
    text: "Puppies delivered to loving homes all around the world.",
    stampClass: "tp-stamp--scallop",
    ink: "#c2622b",
    tilt: "7deg",
    icon: (
      <svg aria-hidden="true" className="tp-stamp__icon" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>
    ),
  },
];

export function TrustSection() {
  return (
    <section
      aria-labelledby="trust-title"
      className="tp-scene tp-passport"
      data-here="false"
      data-pup-scene="true"
      data-tone="light"
      data-visited="false"
      style={{
        ["--sky-top" as string]: "#f0b866",
        ["--sky-bottom" as string]: "#a65a30",
      }}
    >
      <div className="gutter mx-auto max-w-[96rem]">
        <div className="tp-book">
          <div className="tp-book__page tp-book__page--left">
            <p aria-hidden="true" className="tp-book__kicker font-scrawl">
              puppy passport
            </p>
            <h2 className="font-plush tp-book__title" id="trust-title">
              Why families trust TeddyPups
            </h2>

            {/* Mascot Stop 5 */}
            <div
              className="pup-stop tp-book__teddy"
              data-facing="right"
              data-pose="sit"
              data-pup-stop="true"
            />
          </div>

          <ul className="tp-book__page tp-book__page--right">
            {entries.map((entry, idx) => (
              <li
                key={entry.title}
                className="tp-entry"
                style={{
                  ["--ink-stamp" as string]: entry.ink,
                  ["--tilt" as string]: entry.tilt,
                  ["--i" as string]: idx,
                }}
              >
                <span className={`tp-stamp ${entry.stampClass}`}>
                  {entry.icon}
                  <span className="tp-stamp__title font-plush">{entry.title}</span>
                </span>
                <p className="tp-entry__text">{entry.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dusk Horizon Cityscape */}
      <div aria-hidden="true" className="tp-horizon">
        <span className="tp-horizon__sun" />
        <svg
          className="tp-horizon__city"
          preserveAspectRatio="none"
          viewBox="0 0 1440 160"
        >
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
        </svg>
      </div>
    </section>
  );
}
