# Diagrams

Read this when someone asks for a diagram or a chart that explains structure: architecture, flow, sequence, states, data model, timeline, a positioning map. Product charts on dashboards are in `layout.md`. For rarer types (Wardley, fishbone, service blueprint, medallion, more than 40 in all), importing from draw.io or Mermaid, and a large icon set, if your environment has the `diagram-design` skill (github.com/cathrynlavery/diagram-design) read it; the essentials are here.

## 1. Should this be a diagram?

Ask whether the reader learns more from a picture than from a good paragraph.

| The content is | Use |
|---|---|
| A list of things | Bullets or a table |
| Attributes compared | A table |
| One relationship | A sentence |
| Relationships, order, containment, position | A diagram |

Deletion is the main craft. Two nodes that always travel together are one node. A line the layout already implies goes away. The diagram is done when nothing can be removed.

## 2. Pick the type

Name the dominant axis. If two types seem right, the one matching what the reader asks first wins. State the type and what you will leave out before drawing.

| Showing | Type |
|---|---|
| Components and connections, one snapshot | Architecture |
| The same system before and after | Two synced architectures with a list of changes |
| Decisions with branches | Flowchart |
| Messages over time between actors | Sequence |
| States, transitions, guards | State machine |
| Entities and relations | ER; add types and keys for a database schema |
| Handoffs across teams | Swimlane |
| Events in time | Timeline; tasks with durations are a Gantt |
| Two axes of judgment | Quadrant |
| Parent and children | Tree or org chart |
| Scope and containment | Nested boxes |
| Levels of abstraction | Layer stack |
| A reinforcing cycle | Loop |
| A quantity splitting across stages | Sankey; ranked drop-off is a funnel |
| Parts of one object | Exploded view |
| A person's experience across stages | User journey |
| What depends on what, with cycles | Dependency graph |

## 3. The system

Use the project's tokens when it has them. Do not ship a default skin into a branded project; ask for a URL or tokens once.

| Role | Purpose |
|---|---|
| Paper | Page and diagram background |
| Ink | Primary text and strokes |
| Muted | Secondary text and default arrows |
| Rule | Hairline borders |
| Accent | One or two focal elements per diagram |
| Link | External or API calls, only if the diagram needs the distinction |

| Rule | Why | Value |
|---|---|---|
| Accent on one or two elements | Five accents means nothing is focal | Decide what the reader must see first |
| Vary nodes by role | Identical boxes erase hierarchy | Focal filled with a tint, stores and externals with distinct stroke treatment, optional dashed |
| Names in sans, technical strings in mono | Mono is for ports, commands and URLs, not a "dev look" | Name 600, sublabel mono and muted |
| Flat | Shadows blur the structure | Borders, no `box-shadow`, radius 6 to 10 or none |
| Grid | Alignment is the appearance of thought | Origins, sizes and gaps on 4px |
| Density about 4 in 10 | Complete, without needing a guide | At most 9 nodes, 12 arrows, 2 callouts. Past that, one overview plus one detail |
| Legend as a bottom strip | Inside the drawing it collides | Only the types actually used |

Slop in diagrams: dark background with cyan glow, mono on everything, gradient boxes, large radii, every box the same, three equal summary cards under the figure, arrows crossing behind unrelated nodes.

## 4. Connectors

These fail a diagram on their own.

| Rule | Value |
|---|---|
| Orthogonal only | Rounded elbows `r=8`; a straight line only when both ends share x or y |
| Labels sit on an opaque paper mask | 14 characters at most, with 6 to 10px of gap from the stroke, never on it |
| No stacked strokes | Offset parallel routes by 12px; use a small hop at a single crossing |
| Own attach point | Several connectors on one edge are spaced `L * k / (N + 1)`, at least 12px apart |
| No transit behind a box that is not an endpoint | Reroute. If impossible: dashed, with the label at the visible end |
| Draw order | Arrows first, then boxes, so nodes mask line ends |
| No vertical text | `writing-mode` on arrows is unreadable |

Style: muted by default, accent on the headline path, dashed `5,4` for optional, async or return.

## 5. Build

One self-contained HTML file with inline SVG. No build step, and copyable as a file.

```html
<div style="overflow-x:auto">
  <svg viewBox="0 0 640 200" style="min-width:640px;width:100%" role="img" aria-labelledby="flow-t flow-d">
    <title id="flow-t">Request path</title>
    <desc id="flow-d">The client calls the API, which reads from the database.</desc>
    <defs>
      <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto">
        <path d="M1 1 7 4 1 7" fill="none" stroke="var(--muted)" stroke-width="1.5"/>
      </marker>
    </defs>
    <path d="M176 76H280" fill="none" stroke="var(--muted)" stroke-width="1.5" marker-end="url(#arrow)"/>
    <rect x="200" y="52" width="56" height="16" fill="var(--paper)"/>
    <text x="228" y="64" text-anchor="middle" class="tag">HTTPS</text>
    <rect x="32" y="48" width="144" height="56" rx="6" fill="var(--paper)" stroke="var(--ink)"/>
    <text x="104" y="80" text-anchor="middle" class="name">Client</text>
  </svg>
</div>
```

- `<title>` first inside the `svg`, with `role="img"` and `aria-labelledby`; IDs prefixed per diagram, since several may share a page.
- `min-width` equal to the `viewBox` width, inside a local `overflow-x: auto` wrapper. Without it a phone scrolls the whole page or clips the figure.
- Expand the `viewBox` about 60px if there is a legend strip.
- Static by default. Motion only when it clarifies an order of events, and the static frame must be complete without it.

For a PNG, render the page in a headless browser at 2x. `scripts/shoot.mjs` can capture it.

## Checklist

- [ ] A table or a paragraph would not do the same job.
- [ ] Remove test: no node, arrow or label can go.
- [ ] Accent on at most two elements; project tokens used.
- [ ] Within the budget, or split into overview and detail.
- [ ] Every connector rule holds, seen in the render at full size and at 390.
- [ ] Accessible name present; nothing clipped; no page-level sideways scroll.

*Adapts material from diagram-design by Cathryn Lavery (MIT). See NOTICE.md.*
