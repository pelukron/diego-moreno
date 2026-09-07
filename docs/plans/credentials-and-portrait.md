# Next evolution: credentials and portrait

**Status:** parked — do not implement in this session.  
**Ship vehicle:** branch `feat/credentials-and-portrait` → pull request → merge to `master`. Never push the evolution straight to `master`.  
**Domain:** `CONTEXT.md`. Do not invent employers, clients, salaries, or CEFR levels.

Hiring owns the URL. Anything added here must help a stranger believe **Angular Expert (L3)** and hire **Senior Frontend**. If it only looks busy, it stays off the landing.

## Out of scope for that PR

- Framework, chatbot, extra SKUs, Interview/Lead, freelance cards
- Dumping a course catalog or a grid of twelve badges
- AI-generated or “aged-up / office-fake” portrait
- Hosting PDFs as the *primary* proof when the issuer has a verify URL
- Changing Track prices, waitlist rules, or language defaults

## Evidence types (do not mix)

| Kind | On the landing | Not on the landing |
|---|---|---|
| **Credential** | Named cert with id + issuer verify URL | Scan of a diploma, 40-hour course PDFs |
| **Course** | Only if it changes a claim you already make (Nx, Signals, a cloud you actually use) | Udemy-style lists, internal Globant/Accenture courses |
| **Portrait** | One real head-and-shoulders photo, same face as LinkedIn and GitHub | Render, stylized edit, gallery |

Certificate *files* in this repo stay closed until this evolution reopens **Credential** (see ADR-0011). Preferred proof order: issuer URL → Credly/credential.net → PDF only if there is no verify path (and even then, not as a Pages dump if a private link suffices).

## Sequence (do not skip)

Work in this order in the future session. Stop if a step is false.

1. **LinkedIn English matches C1**  
   Canonical claim is C1 (ADR-0011). LinkedIn still says professional working proficiency. Align LinkedIn *or* the landing is lying. This is a human step, not a code step.

2. **L3 is still live**  
   `4J095ZM` is the public noun and expires Oct 2026. Confirm renewal. If expired, the kicker cannot say L3.

3. **Portrait**  
   One daylight photo, plain background, clothes you would wear in a US loop. Same (or a crop) on LinkedIn, GitHub, and this site. Light/color grade is fine. Changing face, age, or inventing an office is not. Asset: e.g. `portrait.webp`, ~200–400 px display width, alt = the name. Smaller than the H1. If there is no decent shot, skip the photo; a bad one is worse than none.

4. **C1 as a Credential**  
   Only after there is an issuer + id (IELTS, TOEFL, Cambridge, or another you will defend on a call). Until then C1 stays a claim, not a badge row.

5. **More credentials / courses**  
   Each row: name, issuer, id, verify URL, dates. No logo wall. A short **Credentials** list under the existing certifications — not a new shop section.

6. **PDFs in the repo vs interview-only**  
   Grill this when 1–5 are true. Default until then: interview + issuer URL, no PDF in Pages.

## Copy / layout notes for the implementer

- Default language stays English. CV body stays English.
- Do not promote mentoring above the CV.
- Enterprise employers (Globant, Accenture) may be named; unnamed clients may not; domain (insurance, quoting, policy) may be named; salary may not.
- Do not add “Web Architect” or “Mentor” as the public noun.

## Acceptance

The PR is done when:

- LinkedIn English matches the landing (C1) *or* the landing no longer claims C1
- L3 line is true on the day of merge (live or removed)
- At most one portrait, consistent with LinkedIn/GitHub, or none
- Every new credential row has a verify path
- `node scripts/check-i18n.mjs` passes
- No Interview/Lead SKU, no freelance SKU, no PDF dump

## Future session prompt (paste)

> Continue `docs/plans/credentials-and-portrait.md`. Open `feat/credentials-and-portrait` from current `master`. Do not push to `master`. Follow the sequence; stop on a false step. Do not host certificate PDFs unless we reopen Credential. Domain: `CONTEXT.md`.
