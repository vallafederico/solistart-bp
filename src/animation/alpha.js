import gsap from "~/gsap";
import { onIntersect, onPageLeave } from "~/animation/";

export const animateAlpha = (self) => {
  let viewAnimation;
  onIntersect(self, {
    onIn: () => {
      viewAnimation = gsap.to(self, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "linear",
        delay: 0.3,
      });
    },
    onOut: () => {
      if (viewAnimation) viewAnimation.kill();
      gsap.set(self, { autoAlpha: 0 });
    },
  });

  onPageLeave(async () => {
    gsap.to(self, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "slow.out",
    });
  });
};
