import { Title } from "@solidjs/meta";
import { Aa } from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";

export default function About() {
  setLocationCallback();

  return (
    <main class="h-[300vh] py-20">
      <Title>About</Title>

      <Aa class="px-gx" to="/">
        <p use:animateAlpha>To Home Page</p>
      </Aa>
    </main>
  );
}
