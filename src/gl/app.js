import { webgl, setWebgl } from "~/stores/webgl";
import { ctrl } from "~/stores/controllerStore";
import { Raf } from "~/animation/raf";
import { createEffect } from "solid-js";

export class App {
  static isinit = false;

  static {
    // console.log("initialising app");

    this.isinit = true;
    setWebgl({ alive: true });

    Raf.subscribe(this.render.bind(this), "app");
  }

  /** -- controller */
  static initController() {
    createEffect(() => {
      // console.log("app controller", ctrl.state);
    });
  }

  /** -- IO */
  static callsmth(smth) {
    // console.log("App.callsmth", smth);
  }

  static stateChange(state) {
    // console.log("App.stateChange", state);
  }

  /** -- resize */

  static onResize(data) {
    // console.log("app:resize", data);
  }

  /** -- render */

  static render() {
    // console.log("app:render");
  }

  /** -- scroll */

  static onScroll({ velocity, scroll, direction }) {
    // console.log("app:scroll", velocity, scroll, direction);
  }
}
