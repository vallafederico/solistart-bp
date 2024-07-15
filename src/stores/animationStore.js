import { createStore } from "solid-js/store";
import gsap from "~/gsap";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect } from "solid-js";
import { setCtrlTransition } from "~/stores/controllerStore";

/** animations */
const globalOut = async (duration = 0.5) =>
  await gsap.to("main", {
    autoAlpha: 0,
    ease: "expo.out",
    duration,
    delay: 0.5,
  });

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

/** lifecycle */

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
