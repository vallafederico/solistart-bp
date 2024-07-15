import { Title } from "@solidjs/meta";
import AppearingText from "~/components/AppearingText";
import { Aa } from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/components/alpha.js";

export default function About() {
  setLocationCallback();

  return (
    <main class="h-[300vh] py-20">
      <Title>About</Title>
      <AppearingText>About</AppearingText>

      <Aa class="px-gx" to="/">
        <p use:animateAlpha={self}>To Home Page</p>
      </Aa>
    </main>
  );
}
