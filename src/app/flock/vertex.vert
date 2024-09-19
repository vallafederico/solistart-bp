
#include '../glsl/rotate.glsl'

attribute vec2 reference;
attribute vec4 seeds;
attribute vec3 birdColor;
uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform float size;
uniform float time;

varying vec3 v_position;
varying vec2 v_uv;

// <<< params
const float SCALE = 3.;

void main() {
    vec4 tmpPos = texture2D(texturePosition, reference.xy);

    vec3 rotated = rotate(position, vec3(0., 1., 0.), -1.5708);

    vec3 pos = tmpPos.xyz;
    vec3 velocity = normalize(texture2D(textureVelocity, reference.xy).xyz);
    vec3 newPosition = rotated * SCALE;

    newPosition = mat3(modelMatrix) * (newPosition);

    velocity.z *= -1.;
    float xz = length(velocity.xz);
    float xyz = 1.;
    float x = sqrt(1. - velocity.y * velocity.y);

    float cosry = velocity.x / xz;
    float sinry = velocity.z / xz;

    float cosrz = x / xyz;
    float sinrz = velocity.y / xyz;

    mat3 maty = mat3(cosry, 0, -sinry, 0, 1, 0, sinry, 0, cosry);
    mat3 matz = mat3(cosrz, sinrz, 0, -sinrz, cosrz, 0, 0, 0, 1);

    newPosition = maty * matz * newPosition;
    newPosition += pos * .3;

    vec4 transformed = modelViewMatrix * vec4(newPosition, 1.);

    gl_Position = projectionMatrix * transformed;

    v_position = newPosition;
    v_uv = uv;
}

/*


*/
