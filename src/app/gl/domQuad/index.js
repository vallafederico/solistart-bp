import { Mesh, PlaneGeometry, RawShaderMaterial, DoubleSide } from "three";
import { Resizer } from "../resizer";
import { Scroll } from "../../scroll";
import { clientRectGl } from "~/utils/clientRect";
import { Gl } from "../gl";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

const size = 1;
const res = 1;

export class DomQuad extends Mesh {
  // inView = true;
  #id = Resizer.subscribe(this.#resize.bind(this));
  #scrollUnsub = Scroll.subscribe(this.#scroll.bind(this), Symbol("node"));

  geometry = new PlaneGeometry(size, size, res, res);
  material = new Material();

  #ctrl = {
    x: 0,
    y: 0,
  };

  constructor(item) {
    super();
    this.item = item;
    this.#resize();
  }

  #resize() {
    const rect = clientRectGl(this.item);
    this.#ctrl.x = this.position.x = rect.centerx;
    this.#ctrl.y = rect.centery;
    this.position.y = this.#ctrl.y + Scroll.y * Gl.vp.px;

    this.scale.set(rect.width, rect.height, 1);

    if (this.resize) this.resize(rect);
  }

  #scroll({ velocity, scroll, direction, progress }) {
    if (!this.inView) return;

    // (*) [OPTIM] this calculation should be done only once and not in every component
    this.position.y = this.#ctrl.y + scroll * Gl.vp.px;

    if (this.scroll) this.scroll({ velocity, scroll, direction, progress });
  }

  dispose() {
    Resizer.unsubscribe(this.#id);
    this.#scrollUnsub();
    this.parent.remove(this);
    this.geometry.dispose();
    this.material.dispose();
  }
}

class Material extends RawShaderMaterial {
  constructor(options) {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: options?.u_time || 0 },
        u_t1: { value: options?.u_t1 || null },
      },
      side: DoubleSide,
      wireframe: false,
      transparent: true,
    });
  }

  set time(t) {
    this.uniforms.u_time.value = t;
  }
}
