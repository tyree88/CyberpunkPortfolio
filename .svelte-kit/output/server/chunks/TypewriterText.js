import { k as fallback, y as attr_class, v as attr, q as escape_html, l as bind_props, h as pop, p as push, x as stringify } from "./index.js";
function GlitchText($$payload, $$props) {
  push();
  let text = fallback($$props["text"], "");
  let class_name = fallback($$props["class_name"], "");
  $$payload.out += `<span${attr_class(`glitch-text ${stringify(class_name)} ${stringify("")}`, "svelte-eah5e3")} role="presentation"${attr("aria-label", text)}${attr("data-text", text)}>${escape_html(text)}</span>`;
  bind_props($$props, { text, class_name });
  pop();
}
function TypewriterText($$payload, $$props) {
  push();
  let text = fallback($$props["text"], "");
  let speed = fallback($$props["speed"], 2500);
  let delay = fallback($$props["delay"], 5);
  let cursor = fallback($$props["cursor"], true);
  let displayText = "";
  let typingComplete = false;
  $$payload.out += `<span class="typewriter-container svelte-1d9i1od"><span class="typewriter-text svelte-1d9i1od">${escape_html(displayText)}</span> `;
  if (cursor) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<span${attr_class("cursor svelte-1d9i1od", void 0, { "blinking": typingComplete })}>|</span>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></span>`;
  bind_props($$props, { text, speed, delay, cursor });
  pop();
}
export {
  GlitchText as G,
  TypewriterText as T
};
