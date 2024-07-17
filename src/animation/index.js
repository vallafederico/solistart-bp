import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect } from "solid-js";
import { setCtrlTransition } from "~/stores/controllerStore";
import { createStore } from "solid-js/store";
import gsap from "~/gsap";

/** animations */
import { globalOut } from "./global";

/** page/router controllers */
const [outTransitions, setOutTransition] = createStore({
  elements: [globalOut],
});

/** -- page transitions */
async function animateOutAndTransition(to, el, navigate, location) {
  if (location.pathname === to) return;
  setCtrlTransition(to);

  await Promise.all(outTransitions.elements.map(async (fn) => await fn()));
  navigate(el.pathname);
  reset();
}

function reset() {
  setOutTransition({
    elements: [globalOut],
  });
}

/** exports */
export { animateOutAndTransition, setOutTransition, outTransitions };
export { onOut, onView } from "./lib/lifecycle";
export { onScroll, onTrack } from "./lib/scrolling";
