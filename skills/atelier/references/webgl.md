# Real-time graphics

Read this when a page needs a live shader or a 3D scene. Most pages do not: the Showcase study found that only real 3D needs WebGL. For deep shader work (fluids, volumetrics, path tracing), if your environment has the `shader-dev` skill (github.com/MiniMax-AI/skills) read it; the essentials are here.

## 1. Pick the lightest thing that works

| Want | Use |
|---|---|
| Texture, grain, soft field | CSS or one SVG `feTurbulence` (`showcase.md`) |
| Image redrawn as glyphs, halftone or dither | Canvas 2D (`visuals.md`, section 8) |
| A living field of color or noise behind a hero | One fragment shader, section 2 |
| A real object people look around | Three.js scene, or a video if it does not respond to input |
| A place the page travels through | Scroll world, section 4 |
| A predetermined fly-through | Scrubbed video or image sequence. Do not fake it with Three.js |

The graphic belongs to the product (`direction.md`, the world). A generic noise blob behind a headline is a tell, however smooth it runs.

## 2. A shader field

Colors come from the palette as two ramp stops. Multi-hue color is allowed only inside treated imagery (`showcase.md`, the floor), and two stops of one family read better anyway.

```js
// Draws a slow noise field. Returns stop(). Keep a static background behind the canvas.
export function shaderField(canvas, { from = [0.06, 0.07, 0.09], to = [0.16, 0.2, 0.3], speed = 0.05 } = {}) {
  const gl = canvas.getContext('webgl2', { antialias: false, powerPreference: 'low-power' });
  if (!gl) return () => {};
  const vs = `#version 300 es
  void main() {
    vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
    gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
  }`;
  const fs = `#version 300 es
  precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec3 uFrom, uTo;
  out vec4 outColor;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
  void main() {
    vec2 uv = gl_FragCoord.xy / uRes.y;
    float warp = fbm(uv * 1.5 + uTime);
    float n = fbm(uv * 2.0 + warp * 1.6 - uTime * 0.6);
    vec3 c = mix(uFrom, uTo, smoothstep(0.25, 0.8, n));
    c += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
    outColor = vec4(c, 1.0);
  }`;
  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindVertexArray(gl.createVertexArray());
  const loc = (n) => gl.getUniformLocation(prog, n);
  gl.uniform3fv(loc('uFrom'), from); gl.uniform3fv(loc('uTo'), to);
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = canvas.clientWidth * dpr; canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(loc('uRes'), canvas.width, canvas.height);
  };
  const draw = (t) => { gl.uniform1f(loc('uTime'), t * speed); gl.drawArrays(gl.TRIANGLES, 0, 3); };
  size(); draw(4);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  let visible = true, raf = 0;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(canvas);
  const tick = (ms) => { raf = requestAnimationFrame(tick); if (visible && !document.hidden) draw(ms / 1000); };
  raf = requestAnimationFrame(tick);
  addEventListener('resize', size);
  return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', size); };
}
```

The last line of the fragment shader dithers by one level to hide banding in dark gradients.

| Effect | Technique to search for |
|---|---|
| Organic flowing shapes | Domain warping over fbm noise |
| Cells, cracks, crystal | Voronoi or Worley noise |
| 3D from math, no meshes | Ray marching over signed distance fields, smooth minimum to blend |
| Crisp 2D shapes | 2D SDF with `fwidth` for anti-aliasing |
| Smoke, ink | Fluid solver over ping-pong framebuffers |
| Color from a value | Cosine palette, kept inside the product's hue family |
| Film finish | ACES tone mapping, small vignette, grain |

| GLSL trap | Fix |
|---|---|
| `#version 300 es` must be the first characters | `.trim()` the source if it comes from a script tag |
| `fragCoord`, `texture2D`, `gl_FragColor`, `varying` from ShaderToy code | `gl_FragCoord.xy`, `texture`, an `out vec4`, `in` and `out`. Wrap `mainImage` in a `main()` |
| Functions used before they are declared | Define the callee first |
| `#define X normalize(...)` | Use `const` with the computed value |
| `vec3 x = 1.0`, `.z` on a `vec2`, ternary on a struct | Strict types: `vec3(1.0)`, and `if` for structs |
| Reserved names: `sample`, `filter`, `input`, `output`, `common`, `patch` | Rename |
| `getUniformLocation` returns null | The compiler removed an unused uniform |

Budget per pixel: at most 128 ray-march steps, 32 for inner volume or light loops, 6 octaves of fbm, 1,000 total iterations.

To debug, output the suspect value as color: normals with `nor * 0.5 + 0.5`, step count as grey, distance as `t / maxDist`.

## 3. The floor for anything on a canvas

- The content is in the DOM. The canvas is `aria-hidden` and decorative, or has a text equivalent.
- A designed static background or poster sits behind it for no WebGL, a lost context and slow first paint.
- DPR capped at 1.5 on fields, and pause when offscreen or in a hidden tab.
- Reduced motion draws one frame and stops.
- Text over it reaches 4.5:1. Measure on the brightest frame.
- Check `check.mjs` at 390 and 2560: a field that costs nothing at 1440 can be four times the pixels at 2560.

## 4. A world the page travels through

One persistent scene plus one reversible scroll state. If removing either collapses it into stacked sections, this is the right tool. Otherwise it is a normal Showcase page. Use the `build-threejs-scroll-worlds` skill (github.com/MengTo/Skills) for a full build if your environment has it.

Write these before code:

1. **World rules.** Scale and units, silhouette language, palette with its progression by chapter, material families, roles of the lights, fog, and the motion grammar. Every detail serves one world; unrelated texture packs are the 3D version of slop.
2. **Chapters as data.** 4 to 8, each with story beat, camera, world state (light, fog), focus, DOM copy, assets and a phone override. Reject a chapter that differs only by copy.

```js
const chapters = [{
  id: 'threshold', weight: 1.25,
  camera: { pos: [0, 3.8, 13.5], target: [0, 2.4, -8], fov: 38, phone: { pos: [0, 4.8, 18], fov: 46 } },
  world: { key: 1, fog: 0.018 },
}];
```

| Rule | Why | Value or fix |
|---|---|---|
| One renderer, one scene graph, built once | Rebuilding at seams shows | Persistent landmarks, local sets grouped for culling and loading |
| Native scroll is the source of truth | Wheel hijacking breaks reversal, anchors and access | Measure after fonts settle; turn `scrollY` into a chapter value such as `2.35` |
| Keep two values | Navigation needs exact, the image needs smooth | `exact = fromScroll(scrollY)`; `smooth = reduced ? exact : damp(smooth, exact, 5.2, dt)` |
| Same scroll, same state | Forward, backward, jump and reload must agree | Interpolate declared values between two chapters; no accumulating state |
| Camera is cinematography | Six dolly-ins at one point are one scene | Compose each endpoint at desktop and phone first; each move reveals a new relation |
| Hide seams | Objects must not teleport in open space | Occlusion, darkness, dense fog, a threshold |
| Silhouette first | Scatter cannot rescue a weak form | Large, then medium, then small; bevels and real thickness |
| Texture color space | Wrong space looks washed or plastic | Color maps sRGB; normal, roughness, AO and metalness linear |
| Light with intent | Extra lights flatten and cost | One key, restrained fill, practicals. Post-processing last, never to hide weak material |
| Scroll owns the journey, pointer owns local response | Hover must not pull the camera off its path | Raycast named proxy meshes. Mirror every essential hotspot with a real DOM button |
| Load in order | A 40 MB world behind a percentage loses people | First frame complete, then one or two chapters ahead, poster on failure |

| Budget | Phone | Desktop |
|---|---|---|
| DPR cap | 1.25 to 1.5 | 1.5 to 2 |
| Visible triangles | 150k to 300k | 500k to 1.2M |
| Draw calls | 50 to 90 | 90 to 160 |
| Shadowed lights | 1 to 2 | 2 to 4 |
| Critical first transfer | 3 to 6 MB | 5 to 10 MB |

These are starting points. Profile on the target device. Compress with KTX2 and Meshopt or Draco, instance repeats, cap `dt` near 1/30 after stalls, lower DPR and optional effects before deleting landmarks, and dispose of geometries, materials, textures, targets, observers and listeners on teardown.

Reduced motion snaps to the nearest composed chapter and stops ambient loops. Headings, copy, links and the footer stay in semantic HTML, reachable by keyboard.

## Checklist

- [ ] Something lighter could not do this, and the graphic belongs to this product.
- [ ] Content lives in the DOM; a static fallback exists and was seen.
- [ ] Reduced motion and offscreen pause verified.
- [ ] Text contrast measured over the brightest frame.
- [ ] Worlds: same state after slow, fast, reverse, anchor jump and reload at depth; each camera endpoint checked at 390, 1440 and 2560.
- [ ] Say which device and frame rate you actually measured. A desktop check does not cover phones.

*Adapts material from shader-dev by MiniMax (MIT) and build-threejs-scroll-worlds by Meng To (MIT). See NOTICE.md.*
