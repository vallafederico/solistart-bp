import gsap from "~/gsap";
import { onView, onOut } from "~/stores/animationStore";

export const animateAlpha = (self) => {
  onView(self, {
    onIn: () => {
      gsap.to(self, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "linear",
        delay: 0.3,
      });
    },
    onOut: () => {
      gsap.set(self, { autoAlpha: 0 });
    },
  });

  onOut(async () => {
    gsap.to(self, {
      autoAlpha: 0,
      duration: 0.8,
      ease: "slow.out",
    });
  });
};
