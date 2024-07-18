import { GLTFLoader } from "ogl";
import { Gl } from "../gl";

export async function loadModel(path) {
  return GLTFLoader.load(Gl.gl, path);
}

export async function loadGeometry(path) {
  return new Promise((resolve) => {
    GLTFLoader.load(Gl.gl, path).then((data) => {
      resolve(data.meshes[0].primitives[0].geometry);
    });
  });
}
