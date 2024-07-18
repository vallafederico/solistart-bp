import Lenis from "lenis";
import gsap from "~/gsap";
import { App } from "~/app/app";
import { Subscribable } from "~/utils/subscribable";
// import { lerp } from "~/utils/math";

export class Scroll extends Subscribable {
  static init() {
    this.lenis = new Lenis();

    gsap.ticker.add((time) => this.lenis.raf(time * 1000));

    this.lenis.on("scroll", ({ velocity, scroll, direction, progress }) => {
      this.onScroll({ velocity, scroll, direction, progress });
      App.onScroll({ velocity, scroll, direction, progress });
    });
  }

  static get scrollEventData() {
    console.log(this.lenis.percentage);
    return {
      velocity: this.lenis.velocity,
      scroll: this.lenis.scroll,
      direction: this.lenis.direction,
      progress: this.lenis.progress,
    };
  }

  static onScroll({ velocity, scroll, direction }) {
    this.subscribers.forEach(({ sub }) => {
      sub({ velocity, scroll, direction });
    });
  }
}

// Scroll.init();
