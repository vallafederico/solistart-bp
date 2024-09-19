// import { Device } from "./util/device";
import { Gui } from "./util/gui";
import { Renderer, Orbit, Vec3 } from "ogl";

import { viewport } from "~/stores/viewport";
import { Raf } from "./raf";

import { Post } from "./post";
import { Camera } from "./util/camera";
import { Scene } from "./scene";
import { Scroll } from "../scroll";

export const params = {
  clearColor: [0, 0, 0, 1],
};

export class Gl {
  static isinit = false;
  static mouse = { x: 0, y: 0, ex: 0, ey: 0, speed: 0, espeed: 0 };

  static init(canvas) {
    if (this.isinit) return;
    this.isinit = true;

    this.vp = {
      canvas,
      w: viewport.size.width,
      h: viewport.size.height,
      aspect: () => this.vp.w / this.vp.h,
      dpr: () => Math.min(window.devicePixelRatio, 2),
    };

    this.renderer = new Renderer({
      dpr: this.vp.dpr(),
      canvas: this.vp.canvas,
      antialias: false,
      alpha: false,
    });
    this.renderer.setSize(this.vp.w, this.vp.h);

    this.gl = this.renderer.gl;
    this.gl.clearColor(...params.clearColor);

    this.camera = new Camera(this.gl);
    this.post = new Post(this.gl);

    manager(this);

    this.scene = new Scene(this.gl);

    this.controls = new Orbit(this.camera, {
      target: new Vec3(0, 0, 0),
      enabled: false,
      enableZoom: false,
    });

    this.evts();
  }

  static evts() {
    Raf.subscribe(this.update.bind(this), "gl");
    Scroll.subscribe(this.scroll.bind(this), "gl");

    // createEffect(() => {
    //   console.log(ctrl.page, ctrl.state, ctrl.to);
    // });
  }

  static resize({ size }) {
    queueMicrotask(() => {
      this.vp.w = size.width;
      this.vp.h = size.height;
      this.vp.vs = this.camera.viewSize;
      this.vp.px = this.camera.px;

      this.renderer.setSize(this.vp.w, this.vp.h);
      this.camera.resize();
      this.scene.resize();

      // console.log(this.vp);
    });
  }

  static scroll() {
    this.scene?.scroll();
  }

  static update(time) {
    if (!this.isinit) return;
    // Device.monitorWebgl();

    this.controls?.update();
    this.scene?.update(time);

    if (this.post && this.post.isActive) {
      this.post.renderPost(time);
    } else {
      this.renderer.render({
        scene: this.scene,
        camera: this.camera,
      });
    }
  }

  static destroy() {
    this.isinit = false;
    Raf.unsubscribe("gl");
    Scroll.unsubscribe("gl");
  }
}

// manager
function manager(ctrl) {
  document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
      ctrl.paused = !ctrl.paused;
    } else if (e.key === "o") {
      ctrl.controls.enabled = !ctrl.controls.enabled;
    } else if (e.key === "g") {
      Gui.show();
    } else if (e.key === "p") {
      Gl.paused = !Gl.paused;
    }
  });
}
