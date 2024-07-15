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

/** -- Lifecycle */

function onOut(fn) {
  setOutTransition("elements", [...outTransitions.elements, fn]);
}

function onView(ref, { onIn = () => {}, onOut = () => {}, once = true } = {}) {
  const vo = createVisibilityObserver({ threshold: 0.5 });
  const visible = vo(ref);

  createEffect(() => {
    if (visible()) {
      if (onIn) onIn();
    } else {
      if (onOut) onOut();
    }
  });
}

/** exports */
export { animateOutAndTransition };
export { onOut, onView };
export { onScroll, onTrack } from "./lib/scrolling";
