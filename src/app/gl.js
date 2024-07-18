import { Renderer, Orbit, Vec3 } from "ogl";
import { viewport } from "~/stores/viewport";
import { Raf } from "./raf";

import { Post } from "./post";
import { Camera } from "./util/camera";
import { Scene } from "./scene";
import { Scroll } from "./scroll";

export const params = {
  clearColor: [0, 0, 0, 1],
};

export class Gl {
  static isinit = false;
  static mouse = { x: 0, y: 0, ex: 0, ey: 0 };

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

    // keys
    document.addEventListener("keydown", (e) => {
      if (e.key === "o") this.controls.enabled = !this.controls.enabled;
    });
  }

  static resize({ size }) {
    queueMicrotask(() => {
      this.vp.w = size.width;
      this.vp.h = size.height;
      this.vp.vs = this.camera.viewSize;

      this.renderer.setSize(this.vp.w, this.vp.h);
      this.camera.resize();
      this.scene.resize();
    });
  }

  static scroll() {
    this.scene?.scroll();
  }

  static update(time) {
    if (!this.isinit) return;

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
    // console.log("destroy gl");
    this.isinit = false;
    Raf.unsubscribe("gl");
    Scroll.unsubscribe("gl");
  }
}
