import { webgl, setWebgl } from "~/stores/webgl";
import { ctrl, setCtrl } from "~/stores/controllerStore";

import { Scroll } from "~/gl/scroll";
import { Raf } from "~/gl/raf";
import { Gl } from "./gl";

export class App {
  static isinit = false;
  static gl = Gl;

  static {
    this.isinit = true;
    setWebgl({ alive: true });

    Raf.subscribe(this.render.bind(this), "app");
  }

  static init() {
    // * this is reactive
    Scroll.init();
    Raf.init();

    setCtrl("init", true);

    // console.log("app controller", ctrl.state);
  }

  /** -- IO */
  static stateChange(state) {
    // console.log("App.stateChange", state);
  }

  /** -- Lifecycle */
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
