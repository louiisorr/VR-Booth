# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Start local dev server with live reload (http://localhost:3000)
npm run serve  # Start server without file watching
npm run start  # Production start
```

No build step or test suite — this is a GOV.UK Prototype Kit project (rapid prototyping only).

## Architecture

This is a [GOV.UK Prototype Kit](https://prototype-kit.service.gov.uk/docs) project for a service that lets users book a VR booth at a public library.

**Key conventions:**

- **Views** live in `app/views/` as Nunjucks (`.html`) templates. All pages extend `layouts/main.html`, which itself extends the kit's `govuk-branded.njk` layout.
- **Routes** are defined in `app/routes.js` using an Express-style router (`govukPrototypeKit.requests.setupRouter()`). POST handlers read from `req.session.data` and redirect to the next step.
- **Session data** persists automatically across pages via `req.session.data`. Default values are set in `app/data/session-data-defaults.js`. Form field values auto-populate from session data using `data["field-name"]` in templates.
- **Filters** (custom Nunjucks helpers) go in `app/filters.js`.
- **Config** (`app/config.json`) sets `serviceName` and kit-level options.

**User journey (current prototype):**

`start` → `eligibility-age` → (age < 13: `not-eligible`) → `access-needs` → `choose-library` → `choose-date` → `choose-time` → `contact-details`

The age gate route in `routes.js` also sets `req.session.data.adultRequired = 'yes'` for users aged 13–15.

**GOV.UK Frontend macros** (e.g. `govukInput`, `govukRadios`, `govukButton`, `govukBackLink`) are available globally in all templates — no imports needed.

**project overview**

### 1 Scenario

A library network is trialling **VR learning booths**. People can book a 30-minute session at a local library.

**Constraints**

- Under-16s need an adult present.
- Some sessions are accessible (seated, captions).
- You can only book up to 14 days ahead.
- Evening slots are in high demand.

---

### 2 What you will build (journey)

Create a working prototype with:

- Branching based on eligibility
- Capturing and reusing answers
- Conditional content
- A **check answers** page
- A **confirmation** screen

**Suggested pages**

- `/start`
- `/eligibility-age`
- `/access-needs`
- `/choose-library`
- `/choose-date`
- `/choose-time`
- `/contact-details`
- `/check-answers`
- `/confirmation`
- `/not-eligible`

---

### 3 Key questions (per page)

**/eligibility-age**

- Question: “How old are you?”
- Input: Number

**Rules**

- If age is **under 13** → send to `/not-eligible`
- If age is **13 to 15** → allow booking, but show an “adult required” message later

**/access-needs**

- Question: “Do you need an accessible VR session?”
- Radios: Yes / No

If **Yes**, ask one more question (conditional content):

- “What would help?” (checkboxes)
    - Seated session
    - Captions
    - Lower sensory mode
    - Other (textarea)

**/choose-library**

- Question: “Choose a library”
- Radios (dummy options)
    - Birmingham Central Library
    - Coventry Library
    - Wolverhampton Library

**/choose-date**

- Input: Date
- Hint: “You can book up to 14 days in advance.”

**/choose-time**

- Radios
    - 10:00
    - 12:00
    - 15:00
    - 17:30

Conditional content requirement:

- If user selects **17:30**, show: “Evening slots are in high demand. If you can, choose an off-peak time.”

**/contact-details**

- Full name
- Email
- “Do you want a text reminder?” (Yes / No)
- If **Yes** → mobile number field appears

---

### 4 Check answers page requirements

**/check-answers** should summarise:

- Age
- Accessible session (and access options if Yes)
- Library
- Date
- Time
- Name
- Email
- Text reminder choice (and number if Yes)

Also include a notice if age is 13 to 15:

- “You will need an adult to attend with you.”

---

### 5 Prototype Kit tasks (what this exercises)

- [ ]  Routes with branching in `app/routes.js`
- [ ]  Storing answers in session data (`req.session.data`)
- [ ]  Conditional content in Nunjucks
- [ ]  Summary list component on check answers
- [ ]  Basic validation:
    - age required
    - library required
    - time required

---

### 6 Definition of done (acceptance criteria)

- Under-13 users reach **/not-eligible**.
- 13–15 users can complete the booking, and see the “adult required” message on check answers.
- Selecting accessible session shows extra fields and they appear on check answers.
- Selecting text reminder shows the mobile field and it appears on check answers.
- Confirmation page shows key booking details (library, date, time).

---

### 7 Stretch goals (optional)

- [ ]  Enforce “book up to 14 days ahead” for real.
- [ ]  Add an error summary pattern to at least 2 pages.
- [ ]  Add a “Change” link loop that returns to check answers after edits.