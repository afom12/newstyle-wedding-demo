import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Phone, MessageCircle, Calendar, Users, MapPin, Star,
  ChevronDown, ChevronRight, Car, Heart, PartyPopper, Sparkles,
  Check, ArrowRight, Clock, LayoutDashboard, Inbox, ArrowLeft,
  Coffee, Gem, TrendingUp, CalendarCheck2, ClipboardList
} from "lucide-react";

/* =========================================================
   CONFIG — everything business-specific lives here so this
   file can be re-skinned for a different client quickly.
   ========================================================= */
const business = {
  name: "New Style",
  fullName: "New Style Wedding Planner & Event Organizer",
  tagline: "Your vision. Our planning. A celebration to remember.",
  city: "Addis Ababa, Ethiopia",
  phone: "+251 9XX XXX XXX",
  whatsapp: "251900000000",
  email: "hello@newstyle-demo.et",
  colors: { ink: "#1C1712", ivory: "#FBF6EE", gold: "#B98F3B", rose: "#C98B7A" },
  stats: [
    { label: "Events Organized", value: 150, suffix: "+" },
    { label: "Beautiful Weddings", value: 80, suffix: "+" },
    { label: "Wedding Car Events", value: 25, suffix: "+" },
    { label: "Years of Experience", value: 5, suffix: "+" },
  ],
  weddingServices: [
    { name: "Full Wedding Planning", desc: "End-to-end planning from first idea to final dance." },
    { name: "Partial Wedding Planning", desc: "Support where you need it, freedom where you don't." },
    { name: "Day-of Coordination", desc: "So on the day itself, you're a guest at your own wedding." },
    { name: "Traditional Ethiopian Weddings", desc: "Habesha ceremony, attire, and ritual, done right." },
    { name: "Modern Weddings", desc: "Contemporary styling with a personal signature." },
    { name: "Engagement & Proposal Planning", desc: "The moment before the moment, planned with care." },
  ],
  eventServices: [
    { name: "Birthday Celebrations", desc: "From intimate gatherings to full-scale parties." },
    { name: "Engagement Parties", desc: "Set the tone for everything that follows." },
    { name: "Graduation Events", desc: "Celebrate the milestone properly." },
    { name: "Corporate Events", desc: "Polished, on-brand, and on schedule." },
    { name: "Baby Showers", desc: "Warm, personal, beautifully arranged." },
    { name: "Private Celebrations", desc: "Anniversaries, reunions, any reason to gather." },
  ],
  cars: [
    { name: "Mercedes-Benz S-Class", tag: "Luxury · Chauffeur Included" },
    { name: "Mercedes-Benz E-Class", tag: "Elegant · Comfortable" },
    { name: "Toyota Land Cruiser", tag: "Luxury · Spacious" },
    { name: "BMW 7 Series", tag: "Premium · Stylish" },
  ],
  packages: [
    { name: "Essential", desc: "Perfect for smaller celebrations", price: "25,000", features: ["Day-of coordination", "Vendor checklist", "6-hour on-site support"] },
    { name: "Signature", desc: "Our most popular package", price: "45,000", features: ["Full planning support", "Décor direction", "Full-day coordination", "Vendor management"], popular: true },
    { name: "Luxury", desc: "Complete celebration experience", price: "75,000", features: ["Full planning & design", "Unlimited consultations", "Wedding car included", "Dedicated on-site team"] },
  ],
  testimonials: [
    { quote: "New Style made our wedding day feel effortless. Every detail was handled beautifully.", name: "Hana & Dawit", event: "Wedding, Addis Ababa" },
    { quote: "They understood exactly how to blend our traditional ceremony with a modern reception.", name: "Selam & Yonas", event: "Traditional + Modern Wedding" },
    { quote: "Our corporate anniversary event ran without a single hitch. Genuinely professional.", name: "Meron T.", event: "Corporate Event" },
    { quote: "The wedding car arrangement made our entrance unforgettable.", name: "Betelhem & Nathnael", event: "Wedding Cars" },
  ],
  faqs: [
    { q: "Do you plan traditional Ethiopian weddings?", a: "Yes — traditional Habesha ceremonies, modern weddings, and thoughtful combinations of both are all part of our core work." },
    { q: "Can I book only a wedding car?", a: "Yes, wedding car rental is available as a standalone service, no full planning package required." },
    { q: "How early should I book my wedding?", a: "We recommend reaching out 4–6 months ahead for full planning, though we can accommodate shorter timelines depending on availability." },
    { q: "Do you provide decoration?", a: "Yes, décor direction and setup is included in our Signature and Luxury packages, and available as an add-on otherwise." },
    { q: "Can you organize events outside Addis Ababa?", a: "Yes, we take on events across Ethiopia — travel and logistics are scoped into your quote." },
    { q: "Can I customize a package?", a: "Every package is a starting point. We adjust scope, services, and pricing to fit your event." },
    { q: "How do I request a quotation?", a: "Fill out the inquiry form below with your event details, and our team will follow up with a tailored quote." },
    { q: "Can I book a consultation?", a: "Yes — submit the form or reach us on WhatsApp to schedule a free initial consultation." },
  ],
};

/* ---------- small reusable pieces ---------- */

function PourMotif({ className = "" }) {
  // Signature recurring device: an abstract "coffee-pour" arc,
  // referencing the Ethiopian coffee ceremony without stereotyping it.
  return (
    <svg viewBox="0 0 160 40" className={className} fill="none" aria-hidden="true">
      <path d="M2 34 C 40 34, 55 6, 90 6 S 140 30, 158 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="158" cy="8" r="2.5" fill="currentColor" />
    </svg>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 700ms ease ${delay}ms, transform 700ms ease ${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
      }}
    >
      {children}
    </div>
  );
}

function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4" style={{ color: business.colors.gold }}>
      <span className="h-px w-8" style={{ backgroundColor: business.colors.gold }} />
      <span className="uppercase text-xs tracking-[0.25em] font-semibold">{children}</span>
    </div>
  );
}

function PrimaryButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-transform hover:-translate-y-0.5 ${className}`}
      style={{ backgroundColor: business.colors.gold, color: business.colors.ink }}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide border transition-colors hover:bg-white/10 ${className}`}
      style={{ borderColor: "rgba(251,246,238,0.4)", color: business.colors.ivory }}
    >
      {children}
    </button>
  );
}

/* ---------- Nav ---------- */

function Navbar({ page, go }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["home", "Home"], ["weddings", "Weddings"], ["events", "Events"],
    ["cars", "Wedding Cars"], ["gallery", "Gallery"], ["about", "About"], ["contact", "Contact"],
  ];
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(28,23,18,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(185,143,59,0.25)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <button onClick={() => go("home")} className="text-left">
          <div className="font-serif text-2xl tracking-wide" style={{ color: business.colors.ivory }}>
            {business.name.toUpperCase()}
          </div>
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: business.colors.gold }}>
            Wedding · Events · Cars
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => go(key)}
              className="text-sm tracking-wide transition-colors"
              style={{ color: page === key ? business.colors.gold : "rgba(251,246,238,0.85)" }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <PrimaryButton onClick={() => go("contact")}>
            Plan Your Event <ArrowRight size={15} />
          </PrimaryButton>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} style={{ color: business.colors.ivory }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-6 flex flex-col gap-4" style={{ backgroundColor: "rgba(28,23,18,0.98)" }}>
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => { go(key); setOpen(false); }}
              className="text-left text-base py-2"
              style={{ color: page === key ? business.colors.gold : business.colors.ivory }}
            >
              {label}
            </button>
          ))}
          <PrimaryButton onClick={() => { go("contact"); setOpen(false); }} className="justify-center mt-2">
            Plan Your Event
          </PrimaryButton>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero({ go }) {
  return (
    <section
      className="relative flex items-center justify-center text-center px-6 pt-40 pb-28 overflow-hidden"
      style={{ backgroundColor: business.colors.ink, minHeight: "92vh" }}
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${business.colors.gold}, transparent 65%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full opacity-10"
        style={{ background: `radial-gradient(circle, ${business.colors.rose}, transparent 65%)` }}
      />
      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          <div className="uppercase text-xs tracking-[0.35em] mb-6" style={{ color: business.colors.gold }}>
            {business.city}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05]" style={{ color: business.colors.ivory }}>
            Your Dream Celebration,<br />Beautifully Planned.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-7 text-lg leading-relaxed max-w-xl mx-auto" style={{ color: "rgba(251,246,238,0.75)" }}>
            From intimate Ethiopian weddings to unforgettable celebrations, we plan, organize,
            and bring every detail together.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton onClick={() => go("contact")}>Start Planning <ArrowRight size={16} /></PrimaryButton>
            <GhostButton onClick={() => go("weddings")}>Explore Our Services</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={400}>
          <PourMotif className="w-40 h-10 mx-auto mt-14" style={{ color: business.colors.gold }} />
          <div className="mt-3 text-xs tracking-[0.2em] uppercase" style={{ color: "rgba(251,246,238,0.55)" }}>
            Wedding Planning · Event Organization · Luxury Wedding Cars
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Trust stats ---------- */

function Counter({ value, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = Math.max(1, Math.round(value / 40));
        const t = setInterval(() => {
          start += step;
          if (start >= value) { setN(value); clearInterval(t); }
          else setN(start);
        }, 25);
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>
      {n}{suffix}
    </span>
  );
}

function TrustStats() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: business.colors.ivory }}>
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <Eyebrow>Trusted To Create Moments That Matter</Eyebrow>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-8">
          {business.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <Counter value={s.value} suffix={s.suffix} />
              <div className="mt-2 text-sm" style={{ color: "#6B5F4F" }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services overview ---------- */

function ServiceCategoryCard({ icon, title, desc, cta, onClick, tone = "light" }) {
  const dark = tone === "dark";
  return (
    <button
      onClick={onClick}
      className="group text-left p-8 rounded-2xl transition-transform hover:-translate-y-1 flex flex-col h-full"
      style={{
        backgroundColor: dark ? business.colors.ink : "#fff",
        border: `1px solid ${dark ? "rgba(185,143,59,0.3)" : "#EDE4D3"}`,
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: dark ? "rgba(185,143,59,0.15)" : "#FBF3E3", color: business.colors.gold }}
      >
        {icon}
      </div>
      <h3 className="font-serif text-2xl mb-2" style={{ color: dark ? business.colors.ivory : business.colors.ink }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: dark ? "rgba(251,246,238,0.65)" : "#6B5F4F" }}>
        {desc}
      </p>
      <span
        className="inline-flex items-center gap-1.5 text-sm font-medium group-hover:gap-2.5 transition-all"
        style={{ color: business.colors.gold }}
      >
        {cta} <ChevronRight size={16} />
      </span>
    </button>
  );
}

function ServicesOverview({ go }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-14">
          <Eyebrow>What We Do</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>
            Everything You Need for Your Celebration
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal delay={0}>
            <ServiceCategoryCard
              icon={<Heart size={20} />} title="Weddings"
              desc="From the first idea to the final dance, we take care of every detail."
              cta="Explore Wedding Services" onClick={() => go("weddings")} tone="dark"
            />
          </Reveal>
          <Reveal delay={100}>
            <ServiceCategoryCard
              icon={<PartyPopper size={20} />} title="Events"
              desc="Beautifully organized celebrations designed around your people, purpose, and style."
              cta="Explore Events" onClick={() => go("events")}
            />
          </Reveal>
          <Reveal delay={200}>
            <ServiceCategoryCard
              icon={<Car size={20} />} title="Wedding Cars"
              desc="Make your entrance unforgettable with elegant wedding transportation."
              cta="View Wedding Cars" onClick={() => go("cars")}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Ethiopian tradition section ---------- */

function EthiopianTradition() {
  const items = [
    { icon: <Coffee size={18} />, label: "Coffee Ceremony", note: "Abol, Tona, Baraka — woven into your celebration where meaningful" },
    { icon: <Gem size={18} />, label: "Habesha Kemis & Attire", note: "Traditional dress coordinated alongside your styling" },
    { icon: <Sparkles size={18} />, label: "Cultural Decor", note: "Motifs and detailing rooted in Ethiopian craft" },
  ];
  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ink }}>
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <Eyebrow>Rooted In Tradition</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: business.colors.ivory }}>
            Celebrating Ethiopian Love &amp; Tradition
          </h2>
          <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: "rgba(251,246,238,0.7)" }}>
            Whether you're planning a traditional Ethiopian celebration, a modern wedding, or a
            beautiful combination of both, we help bring your traditions and personal style together.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6 mt-14">
          {items.map((it, i) => (
            <Reveal key={it.label} delay={i * 100}>
              <div className="p-7 rounded-2xl h-full" style={{ border: "1px solid rgba(185,143,59,0.25)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 mx-auto"
                     style={{ backgroundColor: "rgba(185,143,59,0.15)", color: business.colors.gold }}>
                  {it.icon}
                </div>
                <div className="font-serif text-lg mb-2" style={{ color: business.colors.ivory }}>{it.label}</div>
                <div className="text-sm" style={{ color: "rgba(251,246,238,0.6)" }}>{it.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Wedding / Event grids ---------- */

function ServiceGrid({ items, limit, title, eyebrow, sub }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ivory }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-14">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>{title}</h2>
          {sub && <p className="mt-4 text-sm" style={{ color: "#6B5F4F" }}>{sub}</p>}
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 90}>
              <div className="p-7 rounded-2xl h-full flex flex-col bg-white" style={{ border: "1px solid #EDE4D3" }}>
                <div className="w-10 h-10 rounded-full mb-5 flex items-center justify-center"
                     style={{ backgroundColor: "#FBF3E3", color: business.colors.gold }}>
                  <Sparkles size={16} />
                </div>
                <h3 className="font-serif text-xl mb-2" style={{ color: business.colors.ink }}>{s.name}</h3>
                <p className="text-sm flex-1" style={{ color: "#6B5F4F" }}>{s.desc}</p>
                <button className="mt-5 text-sm font-medium inline-flex items-center gap-1.5" style={{ color: business.colors.gold }}>
                  Learn More <ChevronRight size={14} />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Wedding cars ---------- */

function CarsSection({ full }) {
  const list = full ? business.cars : business.cars.slice(0, 3);
  const features = ["Professional chauffeur", "Wedding decoration available", "Flexible booking", "Bride & groom transportation"];
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-14">
          <Eyebrow>Wedding Transportation</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>Arrive in Style</h2>
          <p className="mt-4 text-sm" style={{ color: "#6B5F4F" }}>
            Make your wedding entrance as unforgettable as the celebration itself.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}>
              <div className="rounded-2xl overflow-hidden h-full flex flex-col" style={{ border: "1px solid #EDE4D3" }}>
                <div className="h-36 flex items-center justify-center" style={{ backgroundColor: business.colors.ink }}>
                  <Car size={40} style={{ color: business.colors.gold }} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-serif text-lg" style={{ color: business.colors.ink }}>{c.name}</h3>
                  <div className="text-xs mt-1 mb-4" style={{ color: business.colors.gold }}>{c.tag}</div>
                  <button className="mt-auto text-sm font-medium inline-flex items-center gap-1.5" style={{ color: business.colors.ink }}>
                    Request This Car <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {full && (
          <Reveal className="mt-10 p-7 rounded-2xl grid sm:grid-cols-2 gap-3" delay={100}>
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm" style={{ color: "#6B5F4F" }}>
                <Check size={15} style={{ color: business.colors.gold }} /> {f}
              </div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------- Packages ---------- */

function Packages({ go }) {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ivory }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-14 mx-auto text-center">
          <div className="mx-auto"><Eyebrow>Packages</Eyebrow></div>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>
            Choose Your Starting Point
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {business.packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div
                className="p-8 rounded-2xl h-full flex flex-col relative"
                style={{
                  backgroundColor: p.popular ? business.colors.ink : "#fff",
                  border: p.popular ? `1px solid ${business.colors.gold}` : "1px solid #EDE4D3",
                }}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{ backgroundColor: business.colors.gold, color: business.colors.ink }}>
                    Most Popular
                  </span>
                )}
                <h3 className="font-serif text-2xl" style={{ color: p.popular ? business.colors.ivory : business.colors.ink }}>{p.name}</h3>
                <p className="text-sm mt-1 mb-6" style={{ color: p.popular ? "rgba(251,246,238,0.6)" : "#6B5F4F" }}>{p.desc}</p>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wide" style={{ color: p.popular ? business.colors.gold : "#6B5F4F" }}>Starting from</span>
                  <div className="font-serif text-3xl mt-1" style={{ color: p.popular ? business.colors.ivory : business.colors.ink }}>
                    {p.price} <span className="text-base">ETB</span>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: p.popular ? "rgba(251,246,238,0.75)" : "#6B5F4F" }}>
                      <Check size={14} style={{ color: business.colors.gold }} /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => go("contact")}
                  className="w-full py-3 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: p.popular ? business.colors.gold : business.colors.ink,
                    color: p.popular ? business.colors.ink : business.colors.ivory,
                  }}
                >
                  Get a Custom Quote
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-8 text-sm" delay={300}>
          <span style={{ color: "#6B5F4F" }}>Prices are customized based on your event requirements.</span>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- How it works ---------- */

function HowItWorks() {
  const steps = [
    { n: "01", t: "Tell Us Your Vision", icon: <Sparkles size={18} /> },
    { n: "02", t: "Choose Your Services", icon: <ClipboardList size={18} /> },
    { n: "03", t: "We Plan Every Detail", icon: <Calendar size={18} /> },
    { n: "04", t: "You Celebrate", icon: <PartyPopper size={18} /> },
  ];
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal className="max-w-xl mb-14">
          <Eyebrow>The Process</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>How It Works</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4"
                     style={{ backgroundColor: business.colors.ink, color: business.colors.gold }}>
                  {s.icon}
                </div>
                <div className="text-xs tracking-widest mb-1" style={{ color: business.colors.gold }}>{s.n}</div>
                <div className="font-serif text-lg" style={{ color: business.colors.ink }}>{s.t}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */

function Gallery({ full }) {
  const cats = ["All", "Weddings", "Decor", "Events", "Cars"];
  const [active, setActive] = useState("All");
  const tiles = [
    { cat: "Weddings", h: "h-72" }, { cat: "Decor", h: "h-48" }, { cat: "Events", h: "h-60" },
    { cat: "Cars", h: "h-52" }, { cat: "Weddings", h: "h-64" }, { cat: "Decor", h: "h-56" },
    { cat: "Events", h: "h-48" }, { cat: "Weddings", h: "h-60" },
  ];
  const shown = full ? tiles : tiles.slice(0, 6);
  const filtered = active === "All" ? shown : shown.filter((t) => t.cat === active);
  const tones = ["#1C1712", "#B98F3B", "#C98B7A", "#6B5F4F", "#3A2E22"];
  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ivory }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <Eyebrow>Portfolio</Eyebrow>
            <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>Moments We've Created</h2>
          </div>
          {full && (
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c} onClick={() => setActive(c)}
                  className="px-4 py-2 rounded-full text-xs tracking-wide"
                  style={{
                    backgroundColor: active === c ? business.colors.ink : "#fff",
                    color: active === c ? business.colors.ivory : "#6B5F4F",
                    border: "1px solid #EDE4D3",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </Reveal>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((t, i) => (
            <Reveal key={i} delay={(i % 4) * 80} className={`break-inside-avoid rounded-xl overflow-hidden ${t.h} flex items-end p-4 group cursor-pointer`}>
              <div className={`w-full h-full flex items-end p-4`} style={{ backgroundColor: tones[i % tones.length] }}>
                <span className="text-xs uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{t.cat}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ink }}>
      <div className="max-w-6xl mx-auto">
        <Reveal className="max-w-xl mb-14">
          <Eyebrow>Kind Words</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ivory }}>What Couples Say</h2>
          <p className="text-xs mt-2" style={{ color: "rgba(251,246,238,0.4)" }}>Demonstration testimonials — replace with real client feedback.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6">
          {business.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 2) * 100}>
              <div className="p-7 rounded-2xl h-full" style={{ border: "1px solid rgba(185,143,59,0.25)" }}>
                <div className="flex gap-1 mb-4" style={{ color: business.colors.gold }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}
                </div>
                <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(251,246,238,0.85)" }}>“{t.quote}”</p>
                <div className="text-sm font-medium" style={{ color: business.colors.ivory }}>{t.name}</div>
                <div className="text-xs" style={{ color: business.colors.gold }}>{t.event}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */

function About() {
  const points = ["5+ years of planning experience", "Deep understanding of Ethiopian traditions", "Attention to every detail", "Personalized, dedicated service"];
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#fff" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <Eyebrow>About Us</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl mb-6" style={{ color: business.colors.ink }}>
            Behind Every Beautiful Celebration
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: "#6B5F4F" }}>
            {business.name} is an Ethiopian event planning company focused on creating memorable
            weddings and celebrations — built on close attention to detail and a real understanding
            of Ethiopian culture and tradition.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {points.map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm" style={{ color: business.colors.ink }}>
                <Check size={15} style={{ color: business.colors.gold }} /> {p}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl h-96 flex items-center justify-center" style={{ backgroundColor: business.colors.ink }}>
            <Users size={56} style={{ color: business.colors.gold }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ivory }}>
      <div className="max-w-3xl mx-auto">
        <Reveal className="mb-12">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ink }}>Frequently Asked</h2>
        </Reveal>
        <div className="space-y-3">
          {business.faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid #EDE4D3" }}>
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-medium text-sm" style={{ color: business.colors.ink }}>{f.q}</span>
                  <ChevronDown
                    size={18}
                    style={{ color: business.colors.gold, transform: openIdx === i ? "rotate(180deg)" : "none", transition: "transform 200ms" }}
                  />
                </button>
                {openIdx === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#6B5F4F" }}>{f.a}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact form ---------- */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", eventType: "", date: "", guests: "", services: [], budget: "", message: "",
  });
  const [errors, setErrors] = useState({});

  const serviceOptions = ["Wedding Planning", "Event Planning", "Decoration", "Wedding Cars", "Photography", "Full Package"];

  const toggleService = (s) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.eventType) e.eventType = "Please select an event type.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-28 px-6 text-center" style={{ backgroundColor: business.colors.ink }}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: "rgba(185,143,59,0.15)" }}>
            <Check size={28} style={{ color: business.colors.gold }} />
          </div>
          <h2 className="font-serif text-3xl mb-3" style={{ color: business.colors.ivory }}>Thank You!</h2>
          <p className="text-sm mb-8" style={{ color: "rgba(251,246,238,0.7)" }}>
            Your event inquiry has been received. Our team will contact you shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GhostButton onClick={() => setSubmitted(false)}><ArrowLeft size={15} /> Back to Home</GhostButton>
            <PrimaryButton onClick={() => window.open(`https://wa.me/${business.whatsapp}`, "_blank")}>
              <MessageCircle size={15} /> Chat on WhatsApp
            </PrimaryButton>
          </div>
        </div>
      </section>
    );
  }

  const inputStyle = "w-full px-4 py-3 rounded-lg text-sm outline-none";
  const label = "block text-xs uppercase tracking-wide mb-2";

  return (
    <section className="py-24 px-6" style={{ backgroundColor: business.colors.ink }}>
      <div className="max-w-2xl mx-auto">
        <Reveal className="text-center mb-12">
          <div className="mx-auto flex justify-center"><Eyebrow>Get In Touch</Eyebrow></div>
          <h2 className="font-serif text-4xl md:text-5xl" style={{ color: business.colors.ivory }}>Let's Plan Something Beautiful</h2>
        </Reveal>
        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5 p-8 rounded-2xl" style={{ backgroundColor: "rgba(251,246,238,0.04)", border: "1px solid rgba(185,143,59,0.2)" }}>
            <div>
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Full Name</label>
              <input className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: errors.name ? "1px solid #C98B7A" : "1px solid rgba(185,143,59,0.25)" }}
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-xs mt-1" style={{ color: business.colors.rose }}>{errors.name}</p>}
            </div>
            <div>
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Phone Number</label>
              <input className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: errors.phone ? "1px solid #C98B7A" : "1px solid rgba(185,143,59,0.25)" }}
                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              {errors.phone && <p className="text-xs mt-1" style={{ color: business.colors.rose }}>{errors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Email</label>
              <input className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: "1px solid rgba(185,143,59,0.25)" }}
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Event Type</label>
              <select className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: errors.eventType ? "1px solid #C98B7A" : "1px solid rgba(185,143,59,0.25)" }}
                value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                <option value="">Select...</option>
                {["Wedding", "Engagement", "Birthday", "Graduation", "Corporate Event", "Other"].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.eventType && <p className="text-xs mt-1" style={{ color: business.colors.rose }}>{errors.eventType}</p>}
            </div>
            <div>
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Event Date</label>
              <input type="date" className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: "1px solid rgba(185,143,59,0.25)" }}
                value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Number of Guests</label>
              <input type="number" className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: "1px solid rgba(185,143,59,0.25)" }}
                value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Services Interested In</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <button type="button" key={s} onClick={() => toggleService(s)}
                    className="px-3.5 py-2 rounded-full text-xs"
                    style={{
                      backgroundColor: form.services.includes(s) ? business.colors.gold : "transparent",
                      color: form.services.includes(s) ? business.colors.ink : "rgba(251,246,238,0.7)",
                      border: "1px solid rgba(185,143,59,0.35)",
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Budget Range</label>
              <select className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: "1px solid rgba(185,143,59,0.25)" }}
                value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                <option value="">Select...</option>
                {["Under 20,000 ETB", "20,000–50,000 ETB", "50,000–100,000 ETB", "100,000+ ETB", "Not Sure"].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={label} style={{ color: "rgba(251,246,238,0.6)" }}>Message</label>
              <textarea rows={4} className={inputStyle} style={{ backgroundColor: "#241D16", color: business.colors.ivory, border: "1px solid rgba(185,143,59,0.25)" }}
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <PrimaryButton className="w-full justify-center">Request a Consultation <ArrowRight size={15} /></PrimaryButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Floating WhatsApp + Demo badge ---------- */

function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full shadow-xl transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: "#25D366", color: "#fff" }}
    >
      <MessageCircle size={18} />
      <span className="text-sm font-medium hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}

function DemoBadge() {
  return (
    <div
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full"
      style={{ backgroundColor: "rgba(28,23,18,0.75)", color: "#B98F3B", border: "1px solid rgba(185,143,59,0.35)" }}
    >
      Demo Website
    </div>
  );
}

/* ---------- Footer ---------- */

function Footer({ go }) {
  return (
    <footer className="pt-16 pb-8 px-6" style={{ backgroundColor: "#120E0A" }}>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="font-serif text-xl mb-2" style={{ color: business.colors.ivory }}>{business.name.toUpperCase()}</div>
          <p className="text-sm" style={{ color: "rgba(251,246,238,0.5)" }}>{business.tagline}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: business.colors.gold }}>Explore</div>
          <div className="flex flex-col gap-2">
            {["home", "weddings", "events", "cars", "gallery"].map((k) => (
              <button key={k} onClick={() => go(k)} className="text-sm text-left capitalize" style={{ color: "rgba(251,246,238,0.6)" }}>{k}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: business.colors.gold }}>Contact</div>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(251,246,238,0.6)" }}>
            <span className="flex items-center gap-2"><Phone size={14} /> {business.phone}</span>
            <span className="flex items-center gap-2"><MapPin size={14} /> {business.city}</span>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest mb-4" style={{ color: business.colors.gold }}>Follow</div>
          <div className="flex flex-col gap-2 text-sm" style={{ color: "rgba(251,246,238,0.6)" }}>
            <span>Instagram (link goes here)</span>
            <span>Facebook (link goes here)</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(185,143,59,0.15)" }}>
        <span className="text-xs" style={{ color: "rgba(251,246,238,0.35)" }}>© {new Date().getFullYear()} {business.fullName}. All rights reserved.</span>
        <button onClick={() => go("admin")} className="text-xs flex items-center gap-1.5" style={{ color: "rgba(251,246,238,0.35)" }}>
          <LayoutDashboard size={12} /> Admin Demo
        </button>
      </div>
    </footer>
  );
}

/* ---------- Admin dashboard demo ---------- */

function AdminDashboard({ go }) {
  const inquiries = [
    { customer: "Hana Girma", event: "Wedding", date: "2026-11-14", service: "Full Package", status: "Confirmed" },
    { customer: "Yordanos Bekele", event: "Corporate Event", date: "2026-09-02", service: "Event Planning", status: "Contacted" },
    { customer: "Michael Tesfaye", event: "Engagement", date: "2026-10-05", service: "Wedding Cars", status: "New" },
    { customer: "Ruth Alemu", event: "Birthday", date: "2026-08-28", service: "Decoration", status: "New" },
    { customer: "Bethel & Kaleb", event: "Wedding", date: "2026-12-20", service: "Full Package", status: "Completed" },
  ];
  const statusColor = { New: "#C98B7A", Contacted: "#B98F3B", Confirmed: "#3E7C59", Completed: "#6B5F4F" };
  const cars = [
    { car: "Mercedes S-Class", status: "Booked", booking: "Hana Girma", date: "2026-11-14" },
    { car: "BMW 7 Series", status: "Available", booking: "—", date: "—" },
    { car: "Land Cruiser", status: "Pending", booking: "Bethel & Kaleb", date: "2026-12-20" },
  ];
  const stats = [
    { label: "Total Inquiries", value: "47", icon: <Inbox size={18} /> },
    { label: "Upcoming Events", value: "9", icon: <CalendarCheck2 size={18} /> },
    { label: "Pending Bookings", value: "4", icon: <ClipboardList size={18} /> },
    { label: "Wedding Car Requests", value: "6", icon: <Car size={18} /> },
    { label: "Revenue Estimate", value: "612,000 ETB", icon: <TrendingUp size={18} /> },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F3EA" }}>
      <div className="px-6 md:px-10 py-6 flex items-center justify-between" style={{ backgroundColor: business.colors.ink }}>
        <div className="flex items-center gap-3">
          <LayoutDashboard size={20} style={{ color: business.colors.gold }} />
          <span className="font-serif text-lg" style={{ color: business.colors.ivory }}>{business.name} — Owner Dashboard</span>
        </div>
        <button onClick={() => go("home")} className="text-sm flex items-center gap-1.5" style={{ color: business.colors.ivory }}>
          <ArrowLeft size={15} /> Back to Site
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-sm mb-8" style={{ color: "#6B5F4F" }}>
          A preview of what {business.name} could manage day-to-day — inquiries, bookings, and cars, all in one place. Sample data shown below.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-xl bg-white" style={{ border: "1px solid #EDE4D3" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: "#FBF3E3", color: business.colors.gold }}>{s.icon}</div>
              <div className="font-serif text-2xl" style={{ color: business.colors.ink }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "#6B5F4F" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8" style={{ border: "1px solid #EDE4D3" }}>
          <h3 className="font-serif text-xl mb-5" style={{ color: business.colors.ink }}>Recent Inquiries</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ color: "#8A7C64" }}>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Event</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((r) => (
                  <tr key={r.customer} style={{ borderTop: "1px solid #F0E9DA" }}>
                    <td className="py-3" style={{ color: business.colors.ink }}>{r.customer}</td>
                    <td className="py-3" style={{ color: "#6B5F4F" }}>{r.event}</td>
                    <td className="py-3" style={{ color: "#6B5F4F" }}>{r.date}</td>
                    <td className="py-3" style={{ color: "#6B5F4F" }}>{r.service}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-full text-xs" style={{ backgroundColor: `${statusColor[r.status]}22`, color: statusColor[r.status] }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #EDE4D3" }}>
            <h3 className="font-serif text-xl mb-5" style={{ color: business.colors.ink }}>Wedding Cars</h3>
            <div className="space-y-3">
              {cars.map((c) => (
                <div key={c.car} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F0E9DA" }}>
                  <div>
                    <div className="text-sm" style={{ color: business.colors.ink }}>{c.car}</div>
                    <div className="text-xs" style={{ color: "#8A7C64" }}>{c.booking} · {c.date}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs"
                        style={{ backgroundColor: c.status === "Available" ? "#3E7C5922" : "#B98F3B22", color: c.status === "Available" ? "#3E7C59" : "#B98F3B" }}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6" style={{ border: "1px solid #EDE4D3" }}>
            <h3 className="font-serif text-xl mb-5" style={{ color: business.colors.ink }}>Upcoming Dates</h3>
            <div className="space-y-3">
              {inquiries.filter((i) => i.status !== "Completed").map((c) => (
                <div key={c.customer} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid #F0E9DA" }}>
                  <Calendar size={15} style={{ color: business.colors.gold }} />
                  <div className="text-sm" style={{ color: business.colors.ink }}>{c.date} — {c.event} ({c.customer})</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Root App ---------- */

export default function App() {
  const [page, setPage] = useState("home");

  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fontStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap');
    .font-serif { font-family: 'Fraunces', serif; }
    body, button, input, select, textarea { font-family: 'Manrope', sans-serif; }
  `;

  return (
    <div style={{ backgroundColor: business.colors.ivory }}>
      <style>{fontStyle}</style>
      <DemoBadge />
      <Navbar page={page} go={go} />

      {page === "admin" ? (
        <AdminDashboard go={go} />
      ) : (
        <>
          {page === "home" && (
            <>
              <Hero go={go} />
              <TrustStats />
              <ServicesOverview go={go} />
              <EthiopianTradition />
              <ServiceGrid items={business.weddingServices} limit={3} eyebrow="Weddings" title="Your Wedding, Your Way" />
              <CarsSection full={false} />
              <Packages go={go} />
              <HowItWorks />
              <Gallery full={false} />
              <Testimonials />
              <FAQ />
              <ContactForm />
            </>
          )}

          {page === "weddings" && (
            <>
              <div className="pt-40 pb-4 text-center px-6">
                <Reveal><Eyebrow>Weddings</Eyebrow><h1 className="font-serif text-5xl" style={{ color: business.colors.ink }}>Your Wedding, Your Way</h1></Reveal>
              </div>
              <ServiceGrid items={business.weddingServices} eyebrow="All Services" title="Choose What You Need" />
              <div className="text-center pb-20">
                <PrimaryButton onClick={() => go("contact")}>Let's Plan Your Wedding <ArrowRight size={16} /></PrimaryButton>
              </div>
              <Packages go={go} />
            </>
          )}

          {page === "events" && (
            <>
              <div className="pt-40 pb-4 text-center px-6">
                <Reveal><Eyebrow>Events</Eyebrow><h1 className="font-serif text-5xl" style={{ color: business.colors.ink }}>Tell Us What You're Celebrating</h1></Reveal>
              </div>
              <ServiceGrid items={business.eventServices} eyebrow="All Event Types" title="Celebrations We Organize" />
              <div className="text-center pb-20">
                <PrimaryButton onClick={() => go("contact")}>Request an Event Proposal <ArrowRight size={16} /></PrimaryButton>
              </div>
            </>
          )}

          {page === "cars" && (
            <>
              <div className="pt-40 pb-4 text-center px-6">
                <Reveal><Eyebrow>Wedding Cars</Eyebrow><h1 className="font-serif text-5xl" style={{ color: business.colors.ink }}>Arrive in Style</h1></Reveal>
              </div>
              <CarsSection full={true} />
            </>
          )}

          {page === "gallery" && (
            <>
              <div className="pt-40 pb-4 text-center px-6">
                <Reveal><Eyebrow>Gallery</Eyebrow><h1 className="font-serif text-5xl" style={{ color: business.colors.ink }}>Moments We've Created</h1></Reveal>
              </div>
              <Gallery full={true} />
            </>
          )}

          {page === "about" && (
            <>
              <div className="pt-40" />
              <About />
              <Testimonials />
            </>
          )}

          {page === "contact" && (
            <>
              <div className="pt-40" />
              <ContactForm />
            </>
          )}

          <Footer go={go} />
        </>
      )}

      <WhatsAppFloat />
    </div>
  );
}