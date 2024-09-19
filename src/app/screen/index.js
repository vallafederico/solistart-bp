import { Gl } from '../gl'

import {
  Scene,
  OrthographicCamera,
  WebGLRenderTarget,
  RawShaderMaterial,
  PlaneGeometry,
  NearestFilter,
  RepeatWrapping,
  Mesh,
} from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/Addons.js'

import fragmentShader from './fragment.frag'
import vertexShader from './vertex.vert'

import sim1 from './sim.frag'

function addVariable(gpu, name, frag, { texture, uniforms = {} }) {
  const variable = gpu.addVariable(name, frag, texture || gpu.createTexture())
  gpu.setVariableDependencies(variable, [variable])
  Object.assign(variable.material.uniforms, uniforms)

  return variable
}

const CUT = 0.5

export class Screen extends Scene {
  debug = true
  targetSize = [Gl.vp.w * CUT, Gl.vp.h * CUT]
  plane = new Mesh(new PlaneGeometry(2, 2), new Material())
  gpu = new GPUComputationRenderer(...this.targetSize, Gl.renderer)
  _camera = () => {
    const cam = new OrthographicCamera(-1, 1, 1, -1, -2, 1)
    cam.position.z = 1
    cam.lookAt(0, 0, 0)
    return cam
  }
  _target = () => {
    const target = new WebGLRenderTarget(...this.targetSize)
    target.texture.generateMipmaps = false
    target.texture.minFilter = target.texture.magFilter = NearestFilter
    target.texture.wrapS = target.texture.wrapT = RepeatWrapping

    return target
  }

  constructor() {
    super()

    this.camera = this._camera()
    this.target = this._target()

    this.add(this.plane)
    this.init()
  }

  init() {
    this.sim1 = addVariable(this.gpu, 'sim1', sim1, {
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: [0, 0, 0, 0] },
        u_previous: { value: null },
      },
    })

    this.gpu.init()
  }

  get _sim1() {
    return this.gpu.getCurrentRenderTarget(this.sim1).texture
  }

  render(t) {
    this.plane.material.time = t

    this.sim1.material.uniforms.u_previous.value = this._sim1
    this.sim1.material.uniforms.u_time.value = t
    this.sim1.material.uniforms.u_mouse.value = [
      Gl.mouse.ex,
      Gl.mouse.ey,
      Gl.mouse.espeed,
      0,
    ]

    this.gpu.compute()

    this.plane.material.uniforms.u_texture.value = this._sim1

    if (this.debug) {
      Gl.renderer.setRenderTarget(this.target)
      Gl.renderer.render(this, this.camera)
      Gl.renderer.setRenderTarget(null)
    }
  }

  // get texture() {
  //   return this.debug ? this.target.texture : this._sim1
  // }
}

class Material extends RawShaderMaterial {
  constructor() {
    super({
      fragmentShader,
      vertexShader,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: [0, 0, 0, 0] },
        u_texture: { value: null },
        u_previous: { value: null },
      },
    })
  }

  set time(t) {
    this.uniforms.u_time.value = t
    // let { ex, ey } = Gl.mouse
    // // ex = (ex + 1) * 0.5
    // // ey = (ey + 1) * 0.5
    // this.uniforms.u_time.value = t
    // this.uniforms.u_mouse.value = [ex, ey, 0, 0]
  }
}
