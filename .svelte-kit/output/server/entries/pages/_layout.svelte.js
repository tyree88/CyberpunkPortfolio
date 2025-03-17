import { j as current_component, h as pop, p as push, k as fallback, l as bind_props, m as slot } from "../../chunks/index.js";
import { S as ScanLines } from "../../chunks/ScanLines.js";
import "clsx";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function CursorTrail($$payload, $$props) {
  push();
  onDestroy(() => {
    return;
  });
  $$payload.out += `<div class="cursor-container svelte-facjo"><div class="crosshair svelte-facjo"><div class="cross-vertical svelte-facjo"></div> <div class="cross-horizontal svelte-facjo"></div> <div class="target-circle svelte-facjo"></div></div></div>`;
  pop();
}
function InteractiveBackground($$payload, $$props) {
  push();
  let color = fallback($$props["color"], "#49c5b6");
  let intensity = fallback($$props["intensity"], 0.8);
  let density = fallback($$props["density"], 100);
  $$payload.out += `<div class="three-container svelte-1j1kxdv"></div>`;
  bind_props($$props, { color, intensity, density });
  pop();
}
function _layout($$payload, $$props) {
  push();
  const bgColor = "#49c5b6";
  const bgIntensity = 0.8;
  const bgDensity = 100;
  $$payload.out += `<div class="cyberpunk-container svelte-kyuh27">`;
  InteractiveBackground($$payload, {
    color: bgColor,
    intensity: bgIntensity,
    density: bgDensity
  });
  $$payload.out += `<!----> `;
  ScanLines($$payload);
  $$payload.out += `<!----> `;
  CursorTrail($$payload);
  $$payload.out += `<!----> <div class="content-container svelte-kyuh27"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div></div>`;
  pop();
}
export {
  _layout as default
};
