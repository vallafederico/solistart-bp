import { createStore } from "solid-js/store";
import gsap from "~/gsap";

const [animateOut, setAnimateOut] = createStore({
  elements: [
    async (duration = 1.2) =>
      await gsap.to("main", {
        autoAlpha: 0,
        ease: "expo.out",
        duration,
        delay: 0.5,
      }),
  ],
});

function reset() {
  setAnimateOut({
    elements: [
      async (duration = 1.2) =>
        await gsap.to("main", {
          autoAlpha: 0,
          ease: "expo.out",
          duration,
          delay: 0.5,
        }),
    ],
  });
}

function animationOut(fn) {
  setAnimateOut("elements", [...animateOut.elements, fn]);
}

/** lifecycle */

export { animateOut, setAnimateOut, reset, animationOut };
