import { WebGLRenderer, PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "~/gsap";

import { Device } from "../app/device";
import { Gui } from "~/app/gui";
import { lerp } from "~/utils/math";
import { useMouseSpeed } from "./utils/mouseSpeed";

import { Scene } from "./scene";
import { Post } from "./post/post";
import { Screen } from "./screen";
import { Scroll } from "~/scroll";

export const params = {
  clearColor: [1, 0, 0, 1],
};

export class Gl {
  static paused = false;
  static time = 0;
  static mouse = {
    x: 1,
    y: 1,
    hx: 1,
    hy: 1,
    ex: 0,
    ey: 0,
    speed: 0,
    espeed: 0,
  };

  static start(el) {
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    this.vp = {
      container: el,
      w: window.innerWidth,
      h: window.innerHeight,
      aspect: () => {
        return this.vp.w / this.vp.h;
      },
      dpr: () => {
        return Math.min(window.devicePixelRatio, 2);
      },
    };

    this.renderer.setPixelRatio(this.vp.dpr());
    this.renderer.setSize(this.vp.w, this.vp.h);
    this.renderer.setClearColor(params.clearColor, 1);
    this.vp.container.appendChild(this.renderer.domElement);

    this.camera = new PerspectiveCamera(
      70, // fov
      this.vp.aspect(), // aspect
      0.1, // near
      100, // far
    );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, document.body);
    this.controls.enabled = false;

    queueMicrotask(() => this.init());
    this.evt = this._evt();
    Resizer.init(this.vp.container);
  }

  static _evt() {
    return [
      handleMouseMove(document.body, this.onMouseMove.bind(this)),
      handleResize(this.vp.container, this.resize.bind(this)),
      Scroll.subscribe(this.onScroll.bind(this), "gl"),
      manager(this),
    ];
  }

  static async init() {
    this.scene = new Scene();
    this.screen = new Screen();
    this.post = new Post();

    gsap.ticker.add(this.render.bind(this));
  }

  static render() {
    if (this.paused) return;
    Device.monitorWebgl();
    this.time += 0.05;

    this.mouse.ex = lerp(this.mouse.ex, this.mouse.x, 0.1);
    this.mouse.ey = lerp(this.mouse.ey, this.mouse.y, 0.1);
    this.mouse.espeed = lerp(this.mouse.espeed, this.mouse.speed, 0.1);

    this.controls?.update();
    this.screen?.render(this.time);
    this.scene?.render(this.time);

    if (this.screen?.debug) {
      this.renderer.render(this.screen, this.screen.camera);
    } else {
      this.post.renderPost(this.time);
    }
  }

  static resize({ width, height }) {
    // console.log("resize", width, height);
    this.vp.w = width;
    this.vp.h = height;
    this.vp.viewSize = this.viewSize;
    this.vp.px = this.pixel;

    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.aspect = this.vp.aspect();
    this.camera.updateProjectionMatrix();

    this.scene?.resize();
  }

  static onMouseMove({ clientX, clientY }, speed) {
    if (Device.isMobile) return;
    this.mouse.x = (clientX / this.vp.w) * 2 - 1;
    this.mouse.y = -(clientY / this.vp.h) * 2 + 1;
    this.mouse.hx = clientX - this.vp.w / 2;
    this.mouse.hy = clientY - this.vp.h / 2;
    this.mouse.speed = speed * 0.75;
  }

  static onScroll({ velocity, scroll, direction, progress }) {
    this.scene?.onScroll({ velocity, scroll, direction, progress });
  }

  static destroy() {
    this.renderer.dispose();
    this.vp.container.removeChild(this.renderer.domElement);
    this.evt.forEach((e) => e());
  }

  static get viewSize() {
    const fovInRad = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      this.camera.position.z * Math.tan(fovInRad / 2) * 2,
    );
    return { w: height * (this.vp.w / this.vp.h), h: height };
  }

  static get pixel() {
    // (*) make pixel calculation
    const px = this.viewSize.w / this.vp.w;
    const py = this.viewSize.h / this.vp.h;

    return (px + py) / 2;
  }
}

/** -- Utils */
function manager(ctrl) {
  function handler(e) {
    if (e.key === " ") {
      ctrl.paused = !ctrl.paused;
    } else if (e.key === "o") {
      ctrl.controls.enabled = !ctrl.controls.enabled;
    } else if (e.key === "g") {
      Gui.show();
    } else if (e.key === "p") {
      Gl.paused = !Gl.paused;
    }
  }

  document.addEventListener("keydown", handler);

  return () => {
    document.removeEventListener("keydown", handler);
  };
}

// -- evts
export class Resizer {
  static subscribers = [];
  static observer;

  static init(container, callback = null) {
    // console.log("init resizer", this.subscribers);
    this.observer = new ResizeObserver((entry) => {
      this.subscribers.forEach((sub) => {
        sub.cb(entry[0].contentRect);
      });
    });

    if (callback) this.subscribers.push({ cb: callback, id: "init" });

    this.observer.observe(container);
    return this.dispose;
  }

  static dispose() {
    this.observer.disconnect();
  }

  static subscribe(cb, id = Symbol()) {
    this.subscribers.push({ cb, id });
    return id;
  }

  static unsubscribe(id) {
    this.subscribers = this.subscribers.filter((sub) => sub.id !== id);
  }
}

function handleResize(container, cb) {
  const ro = new ResizeObserver((entry) => cb(entry[0].contentRect));
  ro.observe(container);
  return () => {
    ro.disconnect();
  };
}

const { calculateMouseSpeed } = useMouseSpeed();
function handleMouseMove(e, cb) {
  document.addEventListener("mousemove", (e) => {
    const speed = calculateMouseSpeed(e);
    cb(e, speed);
  });

  return () => {
    document.removeEventListener("mousemove", cb);
  };
}
