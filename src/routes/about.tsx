import { Title } from "@solidjs/meta";
import AppearingText from "~/components/AppearingText";
import { Aa } from "~/components/Aa";
import { animateAlpha } from "~/components/alpha.js";

export default function Home() {
  return (
    <main class="py-20  h-[300vh]">
      <Title>About</Title>
      <AppearingText>About</AppearingText>

      <Aa to="/">
        <p use:animateAlpha={self}>To Home Page</p>
      </Aa>
    </main>
  );
}
