# atelier

A design studio in a skill. atelier teaches coding agents (Claude Code, Codex, Cursor, opencode and anything that reads `SKILL.md` files) to look at an interface the way a senior product designer does, and to build new ones without falling into the template every model reaches for.

It works on running products and on blank pages:

- **Audit** a URL, a repo or a screenshot: a scored report with every problem located and a fix with a value.
- **Refine** an existing screen pass by pass (spacing, color, icons, copy, type, layout, details, visuals, motion) until it reads as designed.
- **Create** a landing page, dashboard, app screen, form, deck or design system from a brief, starting from a direction found in the product itself.
- **Motion**: build, review or remove animations with real numbers for easing, duration and springs.
- **Stress**: break a screen with worst-case data (long names, empty lists, 1,284 rows, RTL, 200% zoom) and fix what breaks.
- **Explore**: three to five working variants on named axes, with a switcher.

Stack-neutral: HTML and CSS, React, Tailwind, Vue, Svelte, Astro, React Native.

## Install

With the [skills CLI](https://github.com/vercel-labs/skills) (Claude Code, Codex, Cursor, opencode and others):

```bash
npx skills add Caiollaz/atelier
```

Or copy the folder by hand:

```bash
git clone https://github.com/Caiollaz/atelier
cp -r atelier/skills/atelier ~/.claude/skills/        # Claude Code (all projects)
cp -r atelier/skills/atelier ~/.codex/skills/         # Codex
cp -r atelier/skills/atelier .cursor/skills/          # Cursor (this project)
cp -r atelier/skills/atelier ~/.config/opencode/skills/  # opencode
```

Optional, for screenshots of running products: `npm i -D playwright && npx playwright install chromium` in your project (or have Chrome installed). The other scripts need only Node 18+.

## Use

Talk to your agent normally; the skill triggers on design requests. Or call it by name.

```
/atelier audit http://localhost:3000/dashboard
/atelier refine src/app/page.tsx, it looks too AI
/atelier create a landing page for a bakery that delivers sourdough before 7am
/atelier review the animations in this PR
/atelier break the members table with worst-case data
/atelier show me three directions for the pricing page
```

In Portuguese works the same: "analisa essa tela", "deixa com cara de produto", "cria uma landing para ...".

What you get back is short: the direction in five lines, a findings table ordered by leverage, the changed files, and what was verified in a browser.

## What is inside

```
skills/atelier/
  SKILL.md                 modes, operating rules, passes, non-negotiables, output contracts
  references/
    direction.md           surfaces, the five direction lines, the idea, DESIGN.md
    audit.md               how to look, score, grade and report
    tells.md               the catalog of AI tells, with detection and fix
    tokens.md              spacing, color ramps, type, radius, depth, icons, buttons
    layout.md              app shells, dashboards and charts, landing pages, forms, tables, decks
    copy.md                headlines, buttons, errors, empty states, numbers
    components.md          component craft and library picks
    interaction.md         press, hover, touch, mobile web, forms, states, accessibility
    motion.md              web motion: gate, easing, durations, springs, performance, review
    native.md              React Native and Expo motion and touch
    robustness.md          worst-case data and how to break a screen
    visuals.md             hero visuals, generated images, device frames, code effects
    prototype.md           exploring variants
    library.md             galleries, exemplary products, design systems, guidance sources
  scripts/
    scan.mjs               static scan for code-visible tells (zero dependencies)
    shoot.mjs              desktop and phone screenshots, light and dark
    contrast.mjs           WCAG contrast for pairs or CSS custom properties
  assets/                  phone and browser frames for real screenshots
  examples/                a deliberately sloppy dashboard to try it on
```

Try it on the example:

```bash
node skills/atelier/scripts/scan.mjs skills/atelier/examples/slop-dashboard.html
```

## Principles

- The product decides the look. Direction comes from what the product does and who it is for, never from what is trending.
- Quiet chrome, one bright moment. Color and craft go into the content that matters, not into every border and button.
- Every value is a decision, from a small scale.
- Real content and honest data. No invented metrics, testimonials or screens.
- Motion earns its place, and stays out of what people repeat all day.
- It survives real data and is accessible by default.
- Removing tells is not enough. A screen with good manners and no idea is still forgettable.

## Em português

atelier é uma skill de design para agentes de código. Ela audita produtos que já estão rodando (URL, repositório ou print), refina telas existentes até parecerem desenhadas por alguém, e cria interfaces do zero a partir de uma direção tirada do próprio produto. Funciona em qualquer stack. Os arquivos estão em inglês, mas o agente responde no idioma em que você escrever. Instale com `npx skills add Caiollaz/atelier` e peça normalmente: "analisa essa tela", "melhora o design desse dashboard", "cria uma landing para ...".

## Credits

atelier stands on the work of others, adapted and rewritten. Full attributions and licenses are in [NOTICE.md](skills/atelier/NOTICE.md), which ships inside the skill folder so the credits travel with every install.

- [unslop](https://heydamir.design/unslop) by Damir Sokolovsky ([@heydamir](https://x.com/heydamir)), CC BY 4.0
- [Emil Kowalski's skills](https://github.com/emilkowalski/skills), MIT
- [taste-skill](https://github.com/Leonxlnx/taste-skill) by Leon Lin, MIT
- claude-design by BadTechBandit, MIT
- design-md and popular-web-designs from the Hermes Agent project and [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), MIT
- [frontend-design](https://github.com/anthropics/claude-plugins-official) by Anthropic, Apache 2.0
- [Vercel Web Interface Guidelines](https://vercel.com/design/guidelines)

## License

Text and references: [CC BY 4.0](LICENSE). Scripts and code samples: [MIT](LICENSE-CODE). Both files are also copied into `skills/atelier/`.
