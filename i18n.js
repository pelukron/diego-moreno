// Chrome, nav, mentoring, and contact are bilingual. Default language is English.
// CV body (summaries, bullets, employer lines) stays English for recruiters.
const T = {
  es: {
    "doc.title": "Diego Moreno — Angular Expert L3 · Senior Frontend",
    "doc.desc": "Angular Expert L3. Senior Frontend. CV público y Angular Senior Track. Monterrey / remote US.",
    "nav.mentor": "Mentoría",
    "nav.cv": "CV",
    "nav.contact": "Contacto",
    "hero.kicker": "Angular Expert L3 · Senior Frontend · TypeScript / Node",
    "hero.title": "Subo de nivel plataformas Angular enterprise.",
    "hero.lede": "10+ años. Angular Level 3 (4J095ZM). Signals, Nx, micro-frontends, TDD, gate de merge request. Monterrey. Available — remote LATAM / US nearshore. Inglés C1.",
    "hero.ctaHire": "Ver CV",
    "hero.ctaMentor": "Angular Senior Track",
    "m.label": "Mentoría",
    "m.title": "Angular Senior Track",
    "m.intro": "No es un curso de Angular. 4 h/mes sobre tu repo: Signals vs RxJS, Nx, MFE, tests que importan, calidad de MR. Cap: 3 asientos concurrentes. Track+ es el mismo asiento, más horas.",
    "m.diagRule": "El Diagnostic es la única entrada. Se ofrece solo cuando hay asiento libre o por liberarse.",
    "m.wait": "Si el Track está lleno: waitlist gratis, FIFO. Cuando se abre un asiento, el primero tiene 7 días para agendar Diagnostic o sale de la cola.",
    "a.k": "Entrada",
    "a.meta": "· 75 min",
    "a.1": "Review en vivo de 1 PR o 1 módulo",
    "a.2": "One-pager: 3 gaps, 3 ejercicios, siguiente paso, fit contra una rúbrica escrita",
    "a.3": "Si no hay fit, ahí queda. La sesión hecha no se reembolsa.",
    "a.4": "Prepago. Cancelá ≥24 h antes para reembolso.",
    "a.cta": "Pedir Diagnostic por LinkedIn",
    "b.k": "Producto",
    "b.meta": "· 4 h / mes",
    "b.plus": "Track+ 6 h · 680 USD — mismo asiento",
    "b.1": "2 sesiones de 60 min (3 en Track+)",
    "b.2": "Async cap 4 mensajes/semana · 24–48 h",
    "b.3": "1 review de PR o diseño por sesión",
    "b.4": "Entregable mensual de 1 página",
    "b.cta": "Pedir por LinkedIn",
    "fit.note": "Las listas de abajo son un resumen público. El fit es una rúbrica escrita en el one-pager. Pagar el Diagnostic no crea fit.",
    "fit.yesT": "Para quién sí",
    "fit.noT": "Para quién no",
    "fit.y1": "Mid 3–7 años que ya entrega features",
    "fit.y2": "Lead que necesita 4 h/mes de second pair of eyes en Nx/MFE",
    "fit.y3": "Repo real (o recorte anónimo si hay NDA)",
    "fit.n1": "Cero a héroes / “explícame *ngFor*”",
    "fit.n2": "“Hazme el PR / el sprint”",
    "fit.n3": "Garantía de empleo o de salario",
    "track.h": "Bloques (elige 1 por mes)",
    "t.1": "Done: un servicio hot-path sin subscription soup.",
    "t.2": "Done: store con entidades + side effects testeable.",
    "t.3": "Done: public API, no barrel caótico.",
    "t.4": "Done: contrato versionado + owner de breaking change.",
    "t.5": "Done: tests que fallan si rompes el negocio.",
    "t.6": "Done: template de review que un lead US firmaría.",
    "m.fine": "El Track se paga adelantado. Extra 130 USD/h. Cancelación 7 días antes. Horas no usadas no se reembolsan. Implementar el sprint es freelance, no Track — no es un producto en este sitio.",
    "cv.label": "CV",
    "cv.title": "Diego Moreno Arellano",
    "cv.intro": "Senior Frontend Engineer. Angular Expert (Level 3). TypeScript, Signals, RxJS, Nx, micro-frontends, Node 20+. Available. Remote LATAM / US nearshore.",
    "cv.sum": "Resumen",
    "cv.p1": "Upgrade and stabilize enterprise Angular platforms: version migrations on a 6-month cadence, shared UI libraries, AG Grid, Material. Business modules with TDD, E2E, and merge-request quality gates. React/Next.js in active use.",
    "cv.p2": "Agentic delivery, not vibe-coding. Anthropic AI Fluency. AI-pod: written plans, spec-driven development, memory bank, deterministic workflows, subagents implement / test / review. MCP + Cline/Cursor execute; human gate on architecture and merges.",
    "cv.exp": "Experiencia",
    "cv.omit": "Enterprise delivery. Client names omitted.",
    "g1": "Led Angular Signals adoption in a micro-frontend insurance platform (quoting, policy, endorsements).",
    "g2": "TDD + strict MR review bar before integration.",
    "g3": "Delivery as an AI-pod: plans, SDD, memory bank, subagents. Human merge gate.",
    "g4": "Product-configuration modules; stable FE/BE contracts across services.",
    "g5": "Nx monorepo: Angular 9+ → current line, Node 16+ → 20+, ~6-month cadence.",
    "g6": "Transversal UI libraries (Material wrapper, AG Grid 27+, shared components).",
    "g7": "Unit + E2E (TestCafe). Jenkins, Grafana, qTest. Rancher. GitLab / GitHub. SAFe.",
    "acc1": "Hardening-team lead: admin modules, RxJS, async flows, file upload.",
    "acc2": "Angular 9: Material, Flex Layout, Sass, lazy loading, shared components.",
    "acc3": "Collaboration on Spring Boot 2 / Java 12 microservices.",
    "ind.h": "Independent",
    "ind.1": "React / Next.js performance and architecture (TypeScript).",
    "ind.2": "AI-pod workflow formalized (Anthropic 4D).",
    "cv.cert": "Certificaciones",
    "cv.certNote": "Credential valid through Oct 2026.",
    "cv.edu": "Formación",
    "co.label": "Contacto",
    "co.title": "Hiring o mentoría",
    "co.intro": "Hiring: Senior Frontend; Lead y Architect también cuentan. Mentoría: Diagnostic primero, y solo si puede existir un asiento. Un mensaje en LinkedIn — indica cuál de los dos."
  },
  en: {
    "doc.title": "Diego Moreno — Angular Expert L3 · Senior Frontend",
    "doc.desc": "Angular Expert L3. Senior Frontend. Public resume and Angular Senior Track. Monterrey / remote US.",
    "nav.mentor": "Mentoring",
    "nav.cv": "Resume",
    "nav.contact": "Contact",
    "hero.kicker": "Angular Expert L3 · Senior Frontend · TypeScript / Node",
    "hero.title": "I upgrade enterprise Angular platforms.",
    "hero.lede": "10+ years. Angular Level 3 (4J095ZM). Signals, Nx, micro-frontends, TDD, merge-request gate. Monterrey. Available — remote LATAM / US nearshore. English C1.",
    "hero.ctaHire": "See resume",
    "hero.ctaMentor": "Angular Senior Track",
    "m.label": "Mentoring",
    "m.title": "Angular Senior Track",
    "m.intro": "Not an Angular course. Four hours a month on your repo: Signals vs RxJS, Nx, MFEs, tests that matter, MR quality. Cap: 3 concurrent seats. Track+ is the same seat, more hours.",
    "m.diagRule": "Diagnostic is the only entry. It is offered only when a seat is free or about to free.",
    "m.wait": "If the Track is full: free waitlist, FIFO. When a seat opens, the head has 7 days to schedule a Diagnostic or they drop.",
    "a.k": "Entry",
    "a.meta": "· 75 min",
    "a.1": "Live review of 1 PR or 1 module",
    "a.2": "One-pager: 3 gaps, 3 drills, next step, fit against a written rubric",
    "a.3": "No fit? We stop there. The fee is kept for a held session.",
    "a.4": "Prepaid. Cancel ≥24 h ahead for a refund.",
    "a.cta": "Request a Diagnostic on LinkedIn",
    "b.k": "Core",
    "b.meta": "· 4 h / month",
    "b.plus": "Track+ 6 h · 680 USD — same seat",
    "b.1": "2×60 min sessions (3 on Track+)",
    "b.2": "Async cap 4 messages/week · 24–48 h",
    "b.3": "One PR or design review per session",
    "b.4": "One-page monthly write-up",
    "b.cta": "Request on LinkedIn",
    "fit.note": "The lists below are a public summary. Fit is a written rubric delivered in the one-pager. Paying for a Diagnostic does not create fit.",
    "fit.yesT": "Yes if",
    "fit.noT": "No if",
    "fit.y1": "Mid, 3–7 years, already shipping features",
    "fit.y2": "A lead who wants 4 h/month of extra eyes on Nx/MFE",
    "fit.y3": "A real repo (or an anonymized slice under NDA)",
    "fit.n1": "Zero-to-hero / “explain *ngFor*”",
    "fit.n2": "“Do the PR / the sprint for me”",
    "fit.n3": "You want a job or salary guarantee",
    "track.h": "Blocks (pick one per month)",
    "t.1": "Done: one hot-path service without subscription soup.",
    "t.2": "Done: entity store + testable side effects.",
    "t.3": "Done: a real public API, not a junk barrel.",
    "t.4": "Done: versioned contract + breaking-change owner.",
    "t.5": "Done: tests that fail when the business breaks.",
    "t.6": "Done: a review template a US lead would sign.",
    "m.fine": "Track is paid up front. Extra 130 USD/h. Cancel 7 days ahead. Unused hours are not refunded. Implementing your sprint is freelance, not Track — not a product on this site.",
    "cv.label": "Resume",
    "cv.title": "Diego Moreno Arellano",
    "cv.intro": "Senior Frontend Engineer. Angular Expert (Level 3). TypeScript, Signals, RxJS, Nx, micro-frontends, Node 20+. Available. Remote LATAM / US nearshore.",
    "cv.sum": "Summary",
    "cv.p1": "Upgrade and stabilize enterprise Angular platforms: version migrations on a 6-month cadence, shared UI libraries, AG Grid, Material. Business modules with TDD, E2E, and merge-request quality gates. React/Next.js in active use.",
    "cv.p2": "Agentic delivery, not vibe-coding. Anthropic AI Fluency. AI-pod: written plans, spec-driven development, memory bank, deterministic workflows, subagents implement / test / review. MCP + Cline/Cursor execute; human gate on architecture and merges.",
    "cv.exp": "Experience",
    "cv.omit": "Enterprise delivery. Client names omitted.",
    "g1": "Led Angular Signals adoption in a micro-frontend insurance platform (quoting, policy, endorsements).",
    "g2": "TDD + strict MR review bar before integration.",
    "g3": "Delivery as an AI-pod: plans, SDD, memory bank, subagents. Human merge gate.",
    "g4": "Product-configuration modules; stable FE/BE contracts across services.",
    "g5": "Nx monorepo: Angular 9+ → current line, Node 16+ → 20+, ~6-month cadence.",
    "g6": "Transversal UI libraries (Material wrapper, AG Grid 27+, shared components).",
    "g7": "Unit + E2E (TestCafe). Jenkins, Grafana, qTest. Rancher. GitLab / GitHub. SAFe.",
    "acc1": "Hardening-team lead: admin modules, RxJS, async flows, file upload.",
    "acc2": "Angular 9: Material, Flex Layout, Sass, lazy loading, shared components.",
    "acc3": "Collaboration on Spring Boot 2 / Java 12 microservices.",
    "ind.h": "Independent",
    "ind.1": "React / Next.js performance and architecture (TypeScript).",
    "ind.2": "AI-pod workflow formalized (Anthropic 4D).",
    "cv.cert": "Certifications",
    "cv.certNote": "Credential valid through Oct 2026.",
    "cv.edu": "Education",
    "co.label": "Contact",
    "co.title": "Hiring or mentoring",
    "co.intro": "Hiring: Senior Frontend; Lead and Architect also count. Mentoring: Diagnostic first, and only if a seat can exist. One LinkedIn note — say which you want."
  }
};

function setLang(lang) {
  if (!T[lang]) lang = "en";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = T[lang][key];
    if (val) el.textContent = val;
  });
  const btnEs = document.getElementById("btn-es");
  const btnEn = document.getElementById("btn-en");
  if (btnEs) btnEs.classList.toggle("on", lang === "es");
  if (btnEn) btnEn.classList.toggle("on", lang === "en");
  if (T[lang]["doc.title"]) document.title = T[lang]["doc.title"];
  const desc = T[lang]["doc.desc"];
  if (desc) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
    const og = document.querySelector('meta[property="og:description"]');
    if (og) og.setAttribute("content", desc);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && T[lang]["doc.title"]) ogTitle.setAttribute("content", T[lang]["doc.title"]);
}

function persistLang(lang) {
  try {
    localStorage.setItem("lang-pref", lang);
  } catch (_) {
    /* private mode */
  }
}

document.getElementById("btn-es")?.addEventListener("click", () => {
  persistLang("es");
  setLang("es");
});
document.getElementById("btn-en")?.addEventListener("click", () => {
  persistLang("en");
  setLang("en");
});

let initial = "en";
try {
  const pref = localStorage.getItem("lang-pref");
  if (pref === "es" || pref === "en") initial = pref;
} catch (_) {
  /* private mode */
}
setLang(initial);
