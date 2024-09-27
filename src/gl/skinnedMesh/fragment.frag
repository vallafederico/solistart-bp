#include '../../glsl/colors.glsl'

uniform float u_time;
uniform sampler2D u_diff; 

varying vec2 v_uv;
varying vec3 v_normal;


uniform vec3 u_col_bg;
// varying vec3 vPosition;


void main() {
  vec4 diff = texture2D(u_diff, v_uv);

  // point light
  vec3 light = normalize(vec3(0., 1., 0.));
  float dProd = dot(v_normal, light);
  float ambient = 0.5;
  float diffuse = 0.7;
  float intensity = ambient + diffuse * dProd;



  diff.rgb = mix( u_col_bg * .7, diff.rgb, intensity);



  gl_FragColor.rgb = diff.rgb ;
  
  // gl_FragColor.rgb = v_normal;
  gl_FragColor.a = 1.;
  // gl_FragColor = vec4(1., 0., 0., 1.);
}
