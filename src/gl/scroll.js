import Lenis from "lenis";
import gsap from "~/gsap";
import { App } from "~/gl/app";

export class Scroll {
  static #subscribers = [];

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

  static subscribe(sub, id) {
    if (!this.#subscribers.find(({ id: _id }) => _id === id))
      this.#subscribers.push({ sub, id });
    // console.log("sub:", id, this.#subscribers);
  }

  static unsubscribe(id) {
    this.#subscribers = this.#subscribers.filter(({ id: _id }) => _id !== id);
    // console.log("unsub:", id, this.#subscribers);
  }

  static onScroll({ velocity, scroll, direction }) {
    this.#subscribers.forEach(({ sub }) => {
      sub({ velocity, scroll, direction });
    });
  }
}

// Scroll.init();
