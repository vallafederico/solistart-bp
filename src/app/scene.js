import { Transform, Box, Plane, Mesh, NormalProgram } from "ogl";
import { Quad } from "./quad";
import { ctrl } from "~/stores/controllerStore";
import { loadAssets } from "./util/loader";
// import { FsQuad } from "./fsquad";

export class Scene extends Transform {
  constructor(gl) {
    super();
    this.gl = gl;

    // console.log("scene", ctrl); // start page
    this.create();
  }

  create() {
    this.quad = new Quad();
    this.quad.setParent(this);

    // this.fsquad = new FsQuad(this.gl);
    // this.fsquad.setParent(this);
  }

  resize() {
    this.children.forEach((child) => {
      if (child.resize) child.resize();
    });
  }

  scroll() {
    this.children.forEach((child) => {
      if (child.scroll) child.scroll();
    });
  }

  update(time) {
    this.children.forEach((child) => {
      if (child.update) child.update(time);
    });
  }
}
