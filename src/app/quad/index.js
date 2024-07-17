import { Gl } from "../gl";
import { Mesh, Plane, Program as P, Texture } from "ogl";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";

export class Quad extends Mesh {
  constructor() {
    super(Gl.gl, {
      geometry: new Plane(Gl.gl, {
        width: 1,
        height: 1,
        widthSegments: 1,
        heightSegments: 1,
      }),
      program: new Program(),
    });
  }

  resize() {}
  scroll() {}
  update() {}
}

class Program extends P {
  constructor({ uniforms } = {}) {
    super(Gl.gl, {
      vertex,
      fragment,
      uniforms: {
        ...uniforms,
        u_time: { value: 0 },
      },
      transparent: true,
      cullFace: null,
    });
  }

  set time(t) {
    this.uniforms.time.value = t;
  }
}
