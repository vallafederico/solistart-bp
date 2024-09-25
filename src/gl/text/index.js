// https://protectwise.github.io/troika/troika-three-text/

import { Mesh, PlaneGeometry, RawShaderMaterial, DoubleSide } from "three";
import { Text as TroikaText } from "troika-three-text";
import { createDerivedMaterial } from "troika-three-utils";

import vertexShader from "./vertex.vert";
import fragmentShader from "./fragment.frag";

const size = 1;
const res = 1;

// // Create:
// const myText = new Text()
// myScene.add(myText)

// // Set properties to configure:
// myText.text = 'Hello world!'
// myText.fontSize = 0.2
// myText.position.z = -2
// myText.color = 0x9966FF

// // Update the rendering:
// myText.sync()

export class Text extends TroikaText {
  text = "Hello World";
  fontSize = 0.1;

  // material = new Material();

  constructor() {
    super();
    this.sync();

    // console.log(this.material);
  }

  render(t) {
    // console.log(t);
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

// -- utils

function findGroup(obj) {
  if (obj.isGroup === true) {
    return obj;
  }

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      const result = findGroup(obj[key]);
      if (result) {
        return result;
      }
    }
  }

  return null;
}
