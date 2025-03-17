import { k as fallback, q as escape_html, m as slot, l as bind_props, h as pop, p as push, t as head } from "../../chunks/index.js";
import "clsx";
import { G as GlitchText, T as TypewriterText } from "../../chunks/TypewriterText.js";
function HeroSection($$payload, $$props) {
  push();
  let title = fallback($$props["title"], "NETRUNNER PROFILE");
  let subtitle = fallback($$props["subtitle"], "Web Development | UI/UX Design | Creative Coding");
  let description = fallback($$props["description"], "AUTHORIZED ACCESS ONLY: This terminal contains advanced development capabilities and creative coding skills. Proceed with caution.");
  $$payload.out += `<div class="hero-section svelte-37iai9"><div class="hero-content svelte-37iai9"><div class="title-section svelte-37iai9">`;
  GlitchText($$payload, { text: title, class_name: "hero-title" });
  $$payload.out += `<!----> <div class="subtitle svelte-37iai9">${escape_html(subtitle)}</div> <div class="description svelte-37iai9">`;
  TypewriterText($$payload, { text: description, speed: 30 });
  $$payload.out += `<!----></div> <div class="after-description svelte-37iai9"><!---->`;
  slot($$payload, $$props, "after-description", {});
  $$payload.out += `<!----></div></div> <div class="cyber-grid svelte-37iai9"><div class="cyber-circuits svelte-37iai9"><div class="cyber-core svelte-37iai9"><div class="core-inner svelte-37iai9"></div> <div class="core-ring svelte-37iai9"></div></div> <div class="grid-horizontal svelte-37iai9"></div> <div class="grid-vertical svelte-37iai9"></div> <div class="grid-diagonal-1 svelte-37iai9"></div> <div class="grid-diagonal-2 svelte-37iai9"></div></div></div> <div class="system-stats svelte-37iai9"><div class="stat svelte-37iai9"><div class="stat-label svelte-37iai9">RAM</div> <div class="stat-value svelte-37iai9">16/16</div></div> <div class="stat svelte-37iai9"><div class="stat-label svelte-37iai9">CPU</div> <div class="stat-value svelte-37iai9">98%</div></div> <div class="stat svelte-37iai9"><div class="stat-label svelte-37iai9">STATUS</div> <div class="stat-value text-active svelte-37iai9">ACTIVE</div></div></div></div></div>`;
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
    $$payload.out += `<div class="hero-container svelte-pvtrfz">`;
    HeroSection($$payload, {
      $$slots: {
        "after-description": ($$payload2) => {
          $$payload2.out += `<button slot="after-description" class="enter-button svelte-pvtrfz" aria-label="Enter Cyberdeck"><span class="enter-text svelte-pvtrfz">ENTER CYBERDECK</span> <div class="button-corner top-left svelte-pvtrfz"></div> <div class="button-corner top-right svelte-pvtrfz"></div> <div class="button-corner bottom-left svelte-pvtrfz"></div> <div class="button-corner bottom-right svelte-pvtrfz"></div></button>`;
        }
      }
    });
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
