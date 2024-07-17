import Lenis from "lenis";
import gsap from "~/gsap";
import { App } from "~/app/app";
import { Subscribable } from "~/utils/subscribable";

export class Scroll extends Subscribable {
  static init() {
    this.lenis = new Lenis();

    gsap.ticker.add((time) => this.lenis.raf(time * 1000));
    this.lenis.on("scroll", ({ velocity, scroll, direction }) => {
      this.onScroll({ velocity, scroll, direction });
      App.onScroll({ velocity, scroll, direction });
    });
  }

  static get scrollEventData() {
    return {
      velocity: this.lenis.velocity,
      scroll: this.lenis.scroll,
      direction: this.lenis.direction,
    };
  }

  static onScroll({ velocity, scroll, direction }) {
    this.subscribers.forEach(({ sub }) => {
      sub({ velocity, scroll, direction });
    });
  }
}

// Scroll.init();
