import { Scene as S } from "three";

import { Quad } from "./quad";
// import { Instance } from "./instance";

// (*) test and setup loader

export class Scene extends S {
  constructor() {
    super();

    this.quad = new Quad();
    this.add(this.quad);
  }

  async load() {}

  render() {}
  resize() {}
  onScroll(scroll) {}
}

// (*) MAKE text class with troika
// (*) MAKE domNode component that always sticks
