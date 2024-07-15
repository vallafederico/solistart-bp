import { webgl, setWebgl } from "~/stores/webgl";
import gsap from "~/gsap";

export class App {
  static isinit = false;

  static {
    // console.log("initialising app");

    this.isinit = true;
    setWebgl({ alive: true });
  }

  static callsmth(smth) {
    // console.log("App.callsmth", smth);
  }

  static stateChange(state) {
    // console.log("App.stateChange", state);
  }

  /** -- Scroll handler */
  static render() {}

  /** -- Scroll handler */
  static onScroll({ velocity, scroll, direction }) {
    // console.log("app:scroll", velocity, scroll, direction);
  }
}
