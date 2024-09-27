import { isClient } from "./utils/isClient";

import gsap from "gsap";

const def = {
  duration: 1.2,
  ease: "expo.out",
};

if (isClient) {
  gsap.defaults(def);
}

export default gsap;
export { def };
