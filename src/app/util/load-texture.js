import { Texture } from "ogl";

export async function loadTexture(path) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      const texture = new Texture(Gl.gl, { image: img });
      const data = [
        img.naturalWidth,
        img.naturalHeight,
        img.naturalWidth / img.naturalHeight,
      ];

      console.log("imageloaded", texture, data);

      resolve(texture);
    };
  });
}
