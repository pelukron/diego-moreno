# Public presence

Diego Moreno Arellano’s public professional presence (this site). Hiring owns the URL. Angular Senior Track is a real product on the same site, secondary. The public noun is Angular Expert (L3). The target employment role is Senior Frontend. Default public language is English. Implementation quality is a Gate on the pull request, not an agent.

## Quality

**Gate**:
A deterministic check that can fail a pull request: i18n keys and domain lint on the public site files. No Biome, no LLM review, no npm dependencies.
_Avoid_: agent-as-CI, pre-commit hooks as the only control, formatter-as-quality

**Claim**:
A public fact a script cannot verify (C1 vs LinkedIn, L3 still live, portrait is a real photo). Claims fail in the world, not in Actions.
_Avoid_: putting Claims in the Gate, “the pipeline says the CV is true”

**Pipe**:
GitHub Actions: job `gate` (`node scripts/gate.mjs`) on pull requests and on `master`; job `deploy` runs only after `gate` on push to `master`. The live site is the list in `scripts/pages-files.txt`, not the whole repo. Branch names include the GitHub issue number (`kind/<issue>-slug`). Requiring the `gate` check to merge is a human Settings step.
_Avoid_: Husky as the source of truth, pushing to `master`, branches without a ticket number, Pages deploy from branch in parallel with Gate

**Artifact**:
A checked-in, re-runnable rule or script. Tomorrow’s human trusts Artifacts, not the chat that produced them. When a rule can fail a PR, it lives as data or a script, not as advice.
_Avoid_: agent-as-memory, quality that exists only in a session log

## Language

**Angular Expert (L3)**:
The public noun. Angular Level 3 credential `4J095ZM`, assumed live (renewal in progress). Not a job title and not a mentoring brand.
_Avoid_: Web Architect (as the noun), Mentor (as the noun), “Angular expert” as a job req

**Senior Frontend**:
The target employment role this URL seeks. Frontend Lead and Web Architect count as hiring wins. They are not the public noun.
_Avoid_: Angular Expert as a job title, fractional expert (that is the Track)

**Hiring**:
The conversion that owns this URL: a conversation that can lead to employment (full-time or contractor) as Senior Frontend, Frontend Lead, or Web Architect.
_Avoid_: dual without an owner, mentoring-first, “personal brand”, selling 4h/month as employment

**Hiring win**:
An employment conversation for Senior Frontend, Frontend Lead, or Web Architect. A Track purchase is not a hiring win. Freelance on someone else’s backlog is not a hiring win.
_Avoid_: inbound, lead (overloaded with Frontend Lead), opportunity

**Available**:
Open to employment. Not “has mentee slots left”.
_Avoid_: open to work (LinkedIn badge language), available for mentoring

**Angular Senior Track**:
A real mentoring product with inventory (cap 3 concurrent mentee slots). Not a course and not a seniority signal.
_Avoid_: course, coaching-as-flavor, “Track” as a hiring program for Diego, Interview/Lead (not a product on this URL)

**Track+**:
The same mentee slot as Track, with more hours. Not a fourth seat and not a separate product.
_Avoid_: Track+ as a second SKU, a way around the cap

**C1**:
The canonical English claim of this presence. LinkedIn must match; it does not today.
_Avoid_: professional working proficiency as the public claim, dropping CEFR while leaving C1 on the landing

**Credential**:
A named certification with an id and a verify path (issuer URL, or shown in interview). This repo does not host certificate files until that decision is reopened.
_Avoid_: PDF dump in GitHub Pages, unverifiable named certs

**Diagnostic**:
The only paid entry to the Track. Never skipped. Offered only when a mentee slot is free or about to free. A 75-minute live review that produces a one-pager and a fit decision. Prepaid; refundable until 24 hours before the session. Buying a Diagnostic does not occupy a mentee slot.
_Avoid_: trial, sales call, consult, interview, deposit toward Track, selling a Diagnostic into a full cap with no seat in sight

**Diagnostic fee**:
Honorarium for a held Diagnostic. Kept whether the decision is fit or no-fit, and whether they buy Track afterwards. Refund exists only if the session is cancelled at least 24 hours ahead.
_Avoid_: deposit, credit, refund after the session, trial payment

**One-pager**:
The Diagnostic delivery: gaps, drills, next step, and the fit decision against the fit rubric.
_Avoid_: proposal, sales deck, the public sí/no bullets (those are not the one-pager)

**Fit bullets**:
The public summary of who the Track is for (and not for). Not the full fit definition.
_Avoid_: treating the landing list as the rubric

**Fit rubric**:
The written, stricter fit definition. Applied in the Diagnostic. Lives in the one-pager, not as marketing copy.
_Avoid_: vibe, “they paid so they’re fit”, the public bullets as the whole rule

**Waitlist**:
A free FIFO queue for the Diagnostic. Not paid, not a mentee slot. When a slot is free or about to free, the head of the queue gets a Diagnostic offer. If they do not schedule it inside the 7-day offer window, they are dropped and the next person is offered.
_Avoid_: paid waitlist, Diagnostic-as-waitlist, unbounded paid reviews, a head that can block the queue forever

**About to free**:
A mentee slot with a hard signal: cancel notice already given, non-renewal already said, or Diego has already decided to cut for no-fit or ghosting (even if the month is still paid). “Maybe they won’t renew” is not about to free.
_Avoid_: last days of a silent month, selling Diagnostic against hope

**Diagnostic offer**:
The invitation to prepay and schedule a Diagnostic, sent only to the waitlist head (or to a new buyer if there is no waitlist) when a slot is free or about to free. The offer window is 7 days.
_Avoid_: offering Diagnostic to the whole waitlist at once, offering into a closed cap

**Mentee slot**:
One of at most three concurrent Track seats. Occupied when the first month of Track is paid. Freed when the Track is not renewed, when cancelled under the notice rule, or when Diego cuts the Track mid-month for no-fit or ghosting.
_Avoid_: Diagnostic booking, “cap 3 mentees” as lifetime, student seat, waitlist seat

**Mentee**:
A person occupying a mentee slot. Not a hiring lead and not a Diagnostic-only buyer.
_Avoid_: student, client (overload with unnamed clients), coachee

**Freelance**:
Paid implementation of the buyer’s backlog or sprint. Not Track, not a mentee slot, not a hiring win. Not a SKU on this URL; mentioned only as a boundary of Track.
_Avoid_: mentoring, freelance card, fractional expert as employment, “extra hours” of the Track (that is Track overage)

**Enterprise employer**:
Globant and Accenture. May be named on this site.
_Avoid_: ACC, client names of those firms

**Unnamed client**:
A customer of an enterprise employer. Never named.
_Avoid_: the insurance company, brand names, “a bank”

**Domain**:
The industry and problem space of unnamed-client work (insurance, quoting, policy, endorsements). May be named.
_Avoid_: pretending the work was generic “enterprise Angular” with no domain
