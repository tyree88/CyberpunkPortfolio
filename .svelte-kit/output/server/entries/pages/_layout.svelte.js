import { d as current_component, c as pop, p as push, e as slot } from "../../chunks/index.js";
import "clsx";
function onDestroy(fn) {
  var context = (
    /** @type {Component} */
    current_component
  );
  (context.d ??= []).push(fn);
}
function ScanLines($$payload, $$props) {
  push();
  $$payload.out += `<div class="scan-lines svelte-14sl73t"></div>`;
  pop();
}
function CursorTrail($$payload, $$props) {
  push();
  onDestroy(() => {
    return;
  });
  $$payload.out += `<div class="cursor-container svelte-facjo"><div class="crosshair svelte-facjo"><div class="cross-vertical svelte-facjo"></div> <div class="cross-horizontal svelte-facjo"></div> <div class="target-circle svelte-facjo"></div></div></div>`;
  pop();
}
function _layout($$payload, $$props) {
  push();
  $$payload.out += `<div class="cyberpunk-container svelte-e9hva2">`;
  ScanLines($$payload);
  $$payload.out += `<!----> `;
  CursorTrail($$payload);
  $$payload.out += `<!----> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div>`;
  pop();
}
export {
  _layout as default
};
