import gsap from "~/gsap";
import { Subscribable } from "~/utils/subscribable";

// raf
export class Raf extends Subscribable {
  static subscribers = [];

  static subscribe(sub, id) {
    if (!this.subscribers.find(({ id: _id }) => _id === id))
      this.subscribers.push({ sub, id });
  }

  static unsubscribe(id) {
    this.subscribers = this.subscribers.filter(({ id: _id }) => _id !== id);
  }

  static init() {
    gsap.ticker.add((time) => this.render(time * 1000));
  }

  static render(t) {
    this.subscribers.forEach(({ sub }) => sub(t));
  }
}
