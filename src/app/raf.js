import gsap from "~/gsap";
import { Subscribable } from "~/utils/subscribable";

// raf
export class Raf extends Subscribable {
  static init() {
    gsap.ticker.add((time) => this.render(time * 1000));
  }

  static render(t) {
    this.subscribers.forEach(({ sub }) => sub(t));
  }
}
