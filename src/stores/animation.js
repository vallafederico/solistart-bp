import { createStore } from "solid-js/store";
import gsap from "~/gsap";

const [animateOut, setAnimateOut] = createStore({
  elements: [
    async (duration = 1.2) =>
      await gsap.to("main", {
        autoAlpha: 0,
        ease: "expo.out",
        duration,
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
        }),
    ],
  });
}

export { animateOut, setAnimateOut, reset };
