import { Gl } from "../gl";
import { Mesh, Triangle, Program as P } from "ogl";
import fragment from "./fragment.frag";
import vertex from "./vertex.vert";

export class Screen extends Mesh {
  constructor(texture) {
    super(Gl.gl, {
      geometry: new Triangle(Gl.gl),
      program: new Program(texture),
    });
  }

  // resize() {}
  scroll() {}
  update(t) {
    this.program.time = t;
  }
}

class Program extends P {
  constructor(texture) {
    super(Gl.gl, {
      vertex,
      fragment,
      uniforms: {
        u_time: { value: 0 },
        u_texture: { value: texture },
      },
      transparent: true,
      cullFace: null,
    });
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }
}
