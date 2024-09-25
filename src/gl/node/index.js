import { Mesh, PlaneGeometry, RawShaderMaterial, DoubleSide } from "three";
import { createWebGlNode } from "../scene";
import { onMount, onCleanup } from "solid-js";
import { Resizer } from "../gl";
import { clientRectGl } from "~/utils/clientRect";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

const size = 1;
const res = 1;

export function webglNode(self) {
  let item;

  onMount(() => {
    queueMicrotask(() => {
      item = createWebGlNode(self);
    });
  });

  onCleanup(() => {
    if (item) item.dispose();
  });
}

// (*) should probably be a group ??

export class Node extends Mesh {
  #id = Resizer.subscribe(this.#resize.bind(this));
  geometry = new PlaneGeometry(size, size, res, res);
  material = new Material();

  constructor(item) {
    super();
    this.item = item;
    this.#resize();
  }

  #resize() {
    // console.log("resize", this.item);
    const rect = clientRectGl(this.item);
    this.position.x = rect.centerx;
    this.position.y = rect.centery;
    this.scale.set(rect.width, rect.height, 1);
  }

  dispose() {
    Resizer.unsubscribe(this.#id);
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
