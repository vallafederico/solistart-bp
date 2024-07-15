import { webgl, setWebgl } from "~/stores/webgl";
import { Raf } from "~/animation/raf";
import gsap from "~/gsap";

import { viewport } from "~/stores/viewport";
import { createEffect } from "solid-js";

export class App {
  static isinit = false;

  static {
    // console.log("initialising app");

    this.isinit = true;
    setWebgl({ alive: true });

    Raf.subscribe(this.render.bind(this), "app");
  }

  static callsmth(smth) {
    // console.log("App.callsmth", smth);
  }

  static stateChange(state) {
    // console.log("App.stateChange", state);
  }

  static onResize(data) {
    // console.log("app:resize", data);
  }

  static render() {
    // console.log("app:render");
  }

  static onScroll({ velocity, scroll, direction }) {
    // console.log("app:scroll", velocity, scroll, direction);
  }
}
