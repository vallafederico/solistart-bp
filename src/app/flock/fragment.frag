#include '../glsl/colors.glsl'

varying vec3 v_position;
uniform sampler2D u_map;

varying vec2 v_uv;

void main() {
    float depth = smoothstep(-9., 5., v_position.z / 10.);

    vec3 map = texture2D(u_map, v_uv).rgb;
    map = mix(col_blue_dark, map, depth);

    gl_FragColor.rgb = vec3(map);
    gl_FragColor.a = 1.;
}
