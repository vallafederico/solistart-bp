import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
const loader = new GLTFLoader()

export default (url, id) => {
  return new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
      // console.log(gltf)

      gltf.scene.traverse((child) => {
        // skinned mesh auto assign
        if (child.isSkinnedMesh) {
          child.parent.animations = gltf.animations
        }
      })

      const result = { model: gltf.scene, animations: gltf.animations }
      resolve(result)
    })
  })
}
