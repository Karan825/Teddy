import Image from "next/image";
import Link from "next/link";
import { getAllGoneHome } from "@/lib/gone-home";

export function GoneHomeView() {
  const tickets = getAllGoneHome();

  return (
    <div className="py-12 md:py-16">
      {/* Header */}
      <header className="gutter max-w-[110rem] mx-auto mb-12 text-center md:text-left">
        <h1 className="font-plush text-huge text-cocoa">Gone home</h1>
        <p className="mt-4 text-lg text-cocoa-soft max-w-3xl leading-relaxed">
          These precious puppies have boarded their ticket home and now bring endless
          smiles, tail wags, and cuddles to loving families across Dubai and the UAE.
        </p>
      </header>

      {/* Ticket Grid */}
      <div className="gutter max-w-[110rem] mx-auto">
        <ul
          aria-label="Adopted puppies tickets"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tickets.map((t, idx) => {
            const name = t.texts[1] || t.alt.split(",")[0] || "Puppy";
            const meta = t.texts[2] || "Adopted to loving home";

            return (
              <li
                key={t.href + idx}
                className="tp-ticket"
                data-armed="true"
                data-reveal="true"
                data-revealed="true"
              >
                <Link
                  className="tp-ticket__link block relative rounded-3xl border-2 border-cocoa bg-[#fffef8] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-toffee group overflow-hidden"
                  href={t.href}
                >
                  {/* Decorative Ticket Header */}
                  <div className="flex items-center justify-between border-b-2 border-dashed border-cocoa/20 pb-3 mb-4">
                    <span className="font-scrawl text-xs font-bold text-toffee tracking-wider uppercase">
                      One Ticket Home ✈️
                    </span>
                    <span className="font-mono text-[11px] font-bold text-cocoa-soft bg-sand/50 px-2 py-0.5 rounded">
                      ADMIT ONE
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* Puppy Photo */}
                    <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-cocoa/40 bg-sand">
                      <Image
                        alt={t.alt}
                        src={t.image}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Ticket Details */}
                    <div className="min-w-0 flex-1">
                      <h2 className="font-plush text-2xl font-bold text-cocoa truncate group-hover:text-toffee transition-colors">
                        {name}
                      </h2>
                      <p className="font-sans text-xs text-cocoa-soft mt-1 truncate">
                        {meta}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-green-800/30 bg-green-50 px-2.5 py-0.5 text-[11px] font-bold text-green-800">
                        <span>❤️</span>
                        <span>Forever Home</span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp mark */}
                  <div className="mt-4 pt-3 border-t-2 border-dashed border-cocoa/20 flex items-center justify-between text-xs text-cocoa-soft">
                    <span className="font-plush font-bold text-cocoa">TeddyPups U.A.E.</span>
                    <span className="font-scrawl text-toffee font-bold">home ♥</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Closing Banner */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl border-2 border-cocoa bg-honey/20 text-center max-w-3xl mx-auto">
          <h2 className="font-plush text-3xl font-bold text-cocoa">
            Want to meet your future puppy?
          </h2>
          <p className="text-cocoa-soft text-base mt-2">
            Explore our currently available puppies or speak with our concierge team on WhatsApp.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link className="btn btn-primary" href="/puppies">
              View available puppies
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              Visit our showroom
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
