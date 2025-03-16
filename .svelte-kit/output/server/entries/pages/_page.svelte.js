import { h as attr_class, i as attr, f as escape_html, j as bind_props, c as pop, p as push, k as stringify, l as head } from "../../chunks/index.js";
import "clsx";
import { f as fallback } from "../../chunks/utils.js";
function GlitchText($$payload, $$props) {
  push();
  let text = fallback($$props["text"], "");
  let class_name = fallback($$props["class_name"], "");
  $$payload.out += `<span${attr_class(`glitch-text ${stringify(class_name)}`, "svelte-59uztm")} role="presentation"${attr("aria-label", text)} tabindex="0">${escape_html(text)}</span>`;
  bind_props($$props, { text, class_name });
  pop();
}
function TypewriterText($$payload, $$props) {
  push();
  let text = fallback($$props["text"], "");
  let speed = fallback($$props["speed"], 1500);
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
function HeroSection($$payload, $$props) {
  push();
  let title = fallback($$props["title"], "NETRUNNER PROFILE");
  let subtitle = fallback($$props["subtitle"], "Web Development | UI/UX Design | Creative Coding");
  let description = fallback($$props["description"], "AUTHORIZED ACCESS ONLY: This terminal contains advanced development capabilities and creative coding skills. Proceed with caution.");
  $$payload.out += `<div class="hero-section svelte-89p7h"><div class="hero-content svelte-89p7h"><div class="title-section svelte-89p7h">`;
  GlitchText($$payload, { text: title, class_name: "hero-title" });
  $$payload.out += `<!----> <div class="subtitle svelte-89p7h">${escape_html(subtitle)}</div> <div class="description svelte-89p7h">`;
  TypewriterText($$payload, { text: description, speed: 30 });
  $$payload.out += `<!----></div></div> <div class="cyber-grid svelte-89p7h"><div class="cyber-circuits svelte-89p7h"><div class="cyber-core svelte-89p7h"><div class="core-inner svelte-89p7h"></div> <div class="core-ring svelte-89p7h"></div></div> <div class="grid-horizontal svelte-89p7h"></div> <div class="grid-vertical svelte-89p7h"></div> <div class="grid-diagonal-1 svelte-89p7h"></div> <div class="grid-diagonal-2 svelte-89p7h"></div></div></div> <div class="system-stats svelte-89p7h"><div class="stat svelte-89p7h"><div class="stat-label svelte-89p7h">RAM</div> <div class="stat-value svelte-89p7h">16/16</div></div> <div class="stat svelte-89p7h"><div class="stat-label svelte-89p7h">CPU</div> <div class="stat-value svelte-89p7h">98%</div></div> <div class="stat svelte-89p7h"><div class="stat-label svelte-89p7h">STATUS</div> <div class="stat-value text-active svelte-89p7h">ACTIVE</div></div></div></div></div>`;
  bind_props($$props, { title, subtitle, description });
  pop();
}
function _page($$payload, $$props) {
  push();
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Cyberpunk Portfolio | Netrunner Resume</title>`;
  });
  {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<div class="hero-container svelte-2brduu">`;
    HeroSection($$payload, {});
    $$payload.out += `<!----> <button class="enter-button svelte-2brduu" aria-label="Enter Cyberdeck"><span class="enter-text svelte-2brduu">ENTER CYBERDECK</span> <div class="button-corner top-left svelte-2brduu"></div> <div class="button-corner top-right svelte-2brduu"></div> <div class="button-corner bottom-left svelte-2brduu"></div> <div class="button-corner bottom-right svelte-2brduu"></div></button></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
