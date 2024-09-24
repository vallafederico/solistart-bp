precision mediump float;
#include '../glsl/colors.glsl'

uniform float u_time;
// uniform sampler2D u_t1; vec4 img = texture2D(u_t1, v_uv);

varying vec2 v_uv;


void main() {

  gl_FragColor.rgb = vec3(v_uv, 0.);
  gl_FragColor.a = 1.;
  
}
