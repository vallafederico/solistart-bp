import { Camera as Cam } from "ogl";
import { Gl } from "../gl";

export class Camera extends Cam {
  constructor(gl, { fov = 25, near = 1, far = 100, z = 5 } = {}) {
    super(gl, { fov, near, far });
    this.fov = fov;
    this.position.z = z;
  }

  get fovInRad() {
    return (this.fov * Math.PI) / 180;
  }

  get viewSize() {
    const height = Math.abs(this.position.z * Math.tan(this.fovInRad / 2) * 2);
    return { w: height * Gl.vp.aspect(), h: height };
  }

  get px() {
    const px = this.viewSize.w / Gl.vp.w;
    const py = this.viewSize.h / Gl.vp.h;
    const p = (px + py) / 2;
    return p;
  }

  resize() {
    this.perspective({ aspect: Gl.vp.aspect() });
  }
}
