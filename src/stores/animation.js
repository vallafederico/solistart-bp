import { createStore } from "solid-js/store";
import gsap from "~/gsap";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect } from "solid-js";

/** animations */
const globalOut = async (duration = 0.5) =>
  await gsap.to("main", {
    autoAlpha: 0,
    ease: "expo.out",
    duration,
    delay: 0.5,
  });

/** store */
const [animateOut, setAnimateOut] = createStore({
  elements: [globalOut],
});

function reset() {
  setAnimateOut({
    elements: [globalOut],
  });
}

/** lifecycle */
function out(fn) {
  setAnimateOut("elements", [...animateOut.elements, fn]);
}

function inView(ref, { inA, outA } = {}) {
  console.log("viewOBS", ref);
  const vo = createVisibilityObserver(ref, { threshold: 0.5 });
  const visible = vo(() => ref);

  createEffect(() => {
    if (visible()) {
      console.log("in view");
      inA?.();
    } else {
      console.log("not in view");
      outA?.();
    }
  });
}

/** exports */
export { animateOut, setAnimateOut, reset, out, inView };
