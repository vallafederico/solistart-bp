import { Scene as S } from "three";
import { Gl } from "./gl";
import { Quad } from "./quad";
import { Text } from "./text";
import { Instance } from "./instance";

import { Node } from "./node";

// (*) test and setup loader

export class Scene extends S {
  constructor() {
    super();

    // this.quad = new Node();
    // this.add(this.quad);

    // this.text = new Text();
    // this.add(this.text);

    // this.instance = new Instance();
    // this.add(this.instance);
  }

  async load() {}

  render() {}
  resize() {}
  onScroll(scroll) {}

  dispose() {
    // this.children.forEach((child) => {
    //   if (child.dispose) child.dispose();
    // });
  }
}

// (*) FIX text class with troika

// (*) prevent recreation if one with same id already exists
export function createWebGlNode(
  domNode,
  webglNode = Node,
  attachTo = Gl.scene,
) {
  const it = new webglNode(domNode);
  attachTo.add(it);
  return it;
}
