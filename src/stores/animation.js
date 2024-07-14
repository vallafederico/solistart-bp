import { createStore } from "solid-js/store";
import gsap from "~/gsap";

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

/** exports */
export { animateOut, setAnimateOut, reset, out };
