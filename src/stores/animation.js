import { createStore } from "solid-js/store";
import gsap from "~/gsap";

const [animateOut, setAnimateOut] = createStore({
  elements: [
    async (duration = 0.6) => {
      await gsap.to("main", {
        autoAlpha: 0,
        ease: "expo.out",
        duration: duration,
      });
    },
  ],
});

export { animateOut, setAnimateOut };
