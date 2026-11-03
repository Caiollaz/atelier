# Copy

Read this when you write or fix any words on a screen: headlines, labels, buttons, errors, empty states, numbers, placeholders. Copy makes a design look templated as fast as a purple gradient does. Words exist to make the interface easier to understand and use; decide what the screen needs to say before writing a line.

Write in the product's language and the user's locale. If the user writes in Portuguese, the product copy is Portuguese unless they say otherwise; the rules below apply in any language.

## Principles

- **From the user's side.** Name things the way users think of them ("notifications", not "webhook config"). Describe instead of selling. Specific beats clever.
- **Plain verbs, active voice.** "Save changes", not "Changes will be saved".
- **One job per element.** A label labels, a hint hints, a button acts.
- **The product's own nouns.** Real names, real places, real numbers. A sentence that would fit a competitor is a placeholder.
- **Honest.** Never invent proof, numbers, customers or features. Unverifiable claims are questions for the user. Sample content is marked as sample.

## Headlines

- Say what the product does for whom, using facts already on the page. "Invoices that chase late payments for you" beats "Supercharge your workflow".
- Two lines or fewer at every width. A rough budget: characters per line is about line width divided by (font size times 0.5). On a 390px phone at 40px, that is about 19 per line, so about 32 to 38 characters for two lines. Fix order when too long: cut words, widen the measure, reduce size last.
- Shapes that work: the name, what it is, the claim, the instruction ("Send the invoice, we'll do the chasing"), the place or the moment.
- Shapes to avoid: the mad-lib ("The AI-powered platform for modern teams"), the tricolon ("Fast. Simple. Secure."), the correction ("Not just X, it's Y"), "X, reimagined", "Welcome to", "Meet X", a question nobody asked, a headline that needs its colon, one word styled differently.
- App pages are titled by context or period ("Invoices", "October 2026"), never by greeting ("Welcome back, Sam! 👋").
- Sentence case. No trailing period on headings, subheads, labels, buttons or captions. Multi-sentence paragraphs keep their periods.

## Supporting text

- One sentence under the headline, up to about 22 words, with a concrete detail (a number, a mechanism, the audience).
- Body paragraphs short, 45 to 75 characters per line, no centered paragraphs over three lines, no justified text.

## Buttons and links

- One to three words naming the action: "Send invoice", "Start free trial", "Export CSV". Not "Submit", "Click here", "Learn more" or "Get started" on their own.
- Keep the verb through the flow: "Publish" leads to a "Published" toast, never "Your post is live!".
- One primary action per screen, and one name for it everywhere.
- Destructive buttons say what they destroy: "Delete 3 invoices".
- Links are links (`<a>`), buttons are buttons. An arrow only where it means "goes somewhere", at most one per block.
- Loading buttons keep their label and add an indicator; or switch to the progressive form with an ellipsis ("Saving…").

## Labels, placeholders and help

- Short labels: "Search", "Email", "Due date". Not "Search anything...", not "Please enter your email address".
- Placeholders show an example or a pattern ("name@company.com", "+55 11 91234-5678") and are never the only label.
- Help text says what the field is for or what format it takes, only when needed. If a control needs a sentence to explain itself, redesign the control.
- Limits are visible before the user hits them ("Up to 280 characters").
- An action that opens more input ends with an ellipsis: "Rename…", "Move to…".

## Numbers and data

- One format per context: `$48,210` next to `$124,860` (not `$124,860.40`). Money with 0 or 2 decimals, never mixed in one view. Percentages with 0 or 1 decimal.
- Every change names its comparison: "+12% vs last month", "3 fewer than last week". Never "+12%!!".
- Use the locale's separators and currency (`Intl.NumberFormat`), relative time for the recent past and absolute dates after about a week (`Intl.RelativeTimeFormat`, `Intl.DateTimeFormat`).
- Numerals for counts ("8 invoices"), proper plurals (`Intl.PluralRules`: "1 invoice", "0 invoices").
- A non-breaking space between number and unit (`10 MB`, `3 min`).
- Mock data is plausible and varied: real-looking names from several cultures, amounts that are not round, dates that make sense together. Never `$123,456`, `[X]`, `Lorem ipsum`, `John Doe`, `jane@acme.com`. Use `example.com` or `.test` for emails in fixtures.

## Errors

- Say what happened, why if it helps, and the way out. "Your card was declined. Try another card or contact your bank."
- No apology theatre ("Oops!", "Uh oh!", "Something went wrong :("), no blame ("You entered an invalid date"), no codes without words.
- Next to the field for form errors; inside the failed block for data errors; a toast only for background failures.
- Keep the user's input. Offer Retry when retrying can work.

## Empty states

- First use: what this place is for and the first action. "No invoices yet. Create one, or import from a spreadsheet."
- No results: what was searched and how to widen it. "No invoices match 'Studio Aurora' in the last 30 days. Search all time."
- Cleared: a quiet confirmation ("All caught up"), without confetti on a screen people visit daily.

## Confirmation, success and toasts

- Confirm only destructive, irreversible actions, and name the consequence: "Delete 'Q3 report'? This removes it for everyone." Prefer undo for everything else.
- Success toasts are short past-tense statements with the object: "Invoice sent to Studio Aurora". Add "Undo" when it applies.
- No exclamation marks anywhere in product copy.

## Words to remove

Hype and filler that make copy read as generated. Replace each with what the thing actually does.

| Avoid | Instead |
|---|---|
| supercharge, turbocharge, unleash, unlock, elevate, empower, revolutionize, transform the way you | The concrete result ("send invoices in one click") |
| seamless, effortless, frictionless, intuitive, powerful, robust, cutting-edge, next-gen, world-class, best-in-class, all-in-one, game-changing | The specific property ("works offline", "imports from Excel") |
| AI-powered (everywhere), magic, ✨ | What the AI produces ("drafts the reminder email") |
| delve, tapestry, leverage, synergy, streamline, holistic, journey | Plain words |
| Welcome back!, Hey there!, Let's get started! | The context or the action |
| Learn more, Get started, Discover more, Explore now, Submit, Click here | The action's name |

Also watch for rhythm tells: three adjectives in a row, every sentence starting with a verb in the imperative, colons in every heading, and middle-dot meta strings (`A · B · C`) on every line.

## Punctuation and typography

- Curly quotes and apostrophes, the real ellipsis `…`.
- En dash for ranges (`9–17h`, `2024–2026`), a hyphen inside compounds. Use em dashes rarely; one or two on a long page read as writing, ten read as a model.
- No double spaces, no exclamation marks, no trailing periods on short UI text.
- All caps only for very short labels; never for sentences.
- `text-wrap: balance` on headings to avoid a single word alone on the last line; `&nbsp;` between the last two words when balance is not available.

## Microcopy by component

| Component | Pattern |
|---|---|
| Page title | Noun or period: "Invoices", "October 2026" |
| Section title | What is inside: "Overdue", "Paid this month" |
| Stat card | Label, figure, change with comparison |
| Table header | The attribute in sentence case: "Due date", "Amount" |
| Filter chip | Attribute and value: "Status: Overdue" |
| Search | "Search" or "Search invoices" |
| Toggle | What it turns on, in the positive: "Email reminders" |
| Checkbox | A full statement the user agrees to |
| Tooltip | A short phrase that adds information the label cannot carry; never the only place for important help |
| Keyboard hint | Keycaps with platform symbols: `⌘ K` on Mac, `Ctrl K` elsewhere |

## Checklist

- [ ] Headline says what this is for whom, in two lines or fewer, with the product's nouns.
- [ ] Every button names its action; one primary action with one name.
- [ ] Every number has one format, a comparison and the locale's separators.
- [ ] Errors explain and offer the way out; empty states say what to do next.
- [ ] No hype words, exclamation marks, greetings, fake data or unverifiable claims.
- [ ] Curly quotes, real ellipsis, en dashes for ranges, no trailing periods on short UI text.

*Adapts material from unslop by Damir Sokolovsky (CC BY 4.0), frontend-design by Anthropic (Apache 2.0), taste-skill by Leon Lin (MIT) and the Vercel Web Interface Guidelines. See NOTICE.md.*
