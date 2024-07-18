import { RenderTarget } from "ogl";
import { Screen } from "./screen.js";
import { Gl } from "../gl.js";

export class Post {
  isActive = true;

  get size() {
    return {
      width: Gl.vp.w * Gl.vp.dpr(),
      height: Gl.vp.h * Gl.vp.dpr(),
    };
  }

  constructor(gl) {
    this.gl = gl;

    this.rt = new RenderTarget(Gl.gl, this.size);
    this.screen = new Screen(this.rt.texture);
  }

  resize() {
    this.rt = new RenderTarget(Gl.gl, this.size);
    // this.quad.resize();
  }

  #render(t) {
    if (!this.isActive) return;
    this.screen.update(t);
  }

  renderPost(t) {
    Gl.renderer.render({
      scene: Gl.scene,
      camera: Gl.camera,
      target: this.rt,
    });

    this.#render(t);

    Gl.renderer.render({
      scene: this.screen,
      camera: Gl.camera,
    });
  }
}
