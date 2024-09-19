// https://threejs.org/examples/?q=gpgpu#webgl_gpgpu_birds_gltf

import {
  ShaderMaterial,
  InstancedMesh,
  SphereGeometry,
  Vector3,
  RepeatWrapping,
  InstancedBufferAttribute,
} from 'three'
import { GPUComputationRenderer } from 'three/examples/jsm/Addons.js'

import simVelocity from './simVelocity.frag'
import simPosition from './simPosition.frag'
import vertexShader from './vertex.vert'
import fragmentShader from './fragment.frag'

import { Gl } from '../gl'
import { Device } from '../device'

// params
const num = 22
const WIDTH = Device.isMobile ? Math.floor(num / 2) : num
const TOTAL = WIDTH * WIDTH
const BOUNDS = 1,
  BOUNDS_HALF = BOUNDS / 2

export class Flock extends InstancedMesh {
  gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, Gl.renderer)
  last = performance.now()
  velocityVariable
  positionVariable
  positionUniforms
  velocityUniforms

  constructor(model = new SphereGeometry(1, 3, 3)) {
    const { geom, map } = findGeometry(model)
    // console.log(map)

    super(geom, new Material({ map }), TOTAL)
    this.position.z = -100

    this.init()

    const ref = createReference(this.geometry)
    this.geometry.setAttribute(
      'reference',
      new InstancedBufferAttribute(ref, 2),
    )
  }

  init() {
    this.initComputeRenderer()
  }

  initComputeRenderer() {
    const dtPosition = this.gpuCompute.createTexture()
    const dtVelocity = this.gpuCompute.createTexture()
    fillPositionTexture(dtPosition)
    fillVelocityTexture(dtVelocity)

    this.velocityVariable = this.gpuCompute.addVariable(
      'textureVelocity',
      simVelocity,
      dtVelocity,
    )
    this.positionVariable = this.gpuCompute.addVariable(
      'texturePosition',
      simPosition,
      dtPosition,
    )

    this.gpuCompute.setVariableDependencies(this.velocityVariable, [
      this.positionVariable,
      this.velocityVariable,
    ])
    this.gpuCompute.setVariableDependencies(this.positionVariable, [
      this.positionVariable,
      this.velocityVariable,
    ])

    this.positionUniforms = this.positionVariable.material.uniforms
    this.velocityUniforms = this.velocityVariable.material.uniforms

    this.positionUniforms['time'] = { value: 0.0 }
    this.positionUniforms['delta'] = { value: 0.0 }
    this.velocityUniforms['time'] = { value: 1.0 }
    this.velocityUniforms['delta'] = { value: 0.0 }
    this.velocityUniforms['testing'] = { value: 1.0 }
    this.velocityUniforms['separationDistance'] = { value: 1.0 }
    this.velocityUniforms['alignmentDistance'] = { value: 1.0 }
    this.velocityUniforms['cohesionDistance'] = { value: 1.0 }
    this.velocityUniforms['freedomFactor'] = { value: 1.0 }
    this.velocityUniforms['predator'] = { value: new Vector3() }
    this.velocityVariable.material.defines.BOUNDS = BOUNDS.toFixed(2)

    this.velocityVariable.wrapS = RepeatWrapping
    this.velocityVariable.wrapT = RepeatWrapping
    this.positionVariable.wrapS = RepeatWrapping
    this.positionVariable.wrapT = RepeatWrapping

    const err = this.gpuCompute.init()
    if (err !== null) console.error(err)
  }

  render(t) {
    const now = performance.now()
    let delta = (now - this.last) / 1000
    if (delta > 1) delta = 1 // safety cap on large deltas
    this.last = now

    this.positionUniforms['time'].value = this.velocityUniforms['time'].value =
      now
    this.positionUniforms['delta'].value = this.velocityUniforms[
      'delta'
    ].value = delta

    if (this.material) {
      this.material.uniforms['time'].value = now / 1000
      this.material.uniforms['delta'].value = delta
    }

    this.velocityUniforms['predator'].value.set(Gl.mouse.hx, Gl.mouse.hy, 0)

    Gl.mouse.hx = 1000
    Gl.mouse.hy = 1000

    this.gpuCompute.compute()

    if (this.material) {
      this.material.uniforms['texturePosition'].value =
        this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture

      this.material.uniforms['textureVelocity'].value =
        this.gpuCompute.getCurrentRenderTarget(this.velocityVariable).texture
    }
  }
}

class Material extends ShaderMaterial {
  constructor(options = {}) {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        texturePosition: { value: null },
        textureVelocity: { value: null },
        time: { value: 0.0 },
        size: { value: 1.0 },
        delta: { value: 0.0 },
        u_map: { value: options.map || null },
      },
    })
  }
}

// -----

function fillPositionTexture(texture) {
  const theArray = texture.image.data

  for (let k = 0, kl = theArray.length; k < kl; k += 4) {
    const x = Math.random() * BOUNDS - BOUNDS_HALF
    const y = Math.random() * BOUNDS - BOUNDS_HALF
    const z = Math.random() * BOUNDS - BOUNDS_HALF

    theArray[k + 0] = x
    theArray[k + 1] = y
    theArray[k + 2] = z
    theArray[k + 3] = 1
  }
}

function fillVelocityTexture(texture) {
  const theArray = texture.image.data

  for (let k = 0, kl = theArray.length; k < kl; k += 4) {
    const x = Math.random() - 0.5
    const y = Math.random() - 0.5
    const z = Math.random() - 0.5

    theArray[k + 0] = x * 10
    theArray[k + 1] = y * 10
    theArray[k + 2] = z * 10
    theArray[k + 3] = 1
  }
}

function createReference() {
  const reference = new Float32Array(TOTAL * 2)
  for (let i = 0, j = 0; i < TOTAL; i++) {
    reference[j++] = (i % WIDTH) / WIDTH
    reference[j++] = Math.floor(i / WIDTH) / WIDTH
  }
  return reference
}

function findGeometry(smth) {
  let geom, map

  if (smth.isBufferGeometry) return smth

  smth.traverse((child) => {
    if (child.isMesh) {
      map = child.material.map || null

      geom = child.geometry
    }
  })

  return { geom, map }
}
