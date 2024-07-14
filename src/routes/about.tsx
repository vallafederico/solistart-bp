import { Title } from "@solidjs/meta";
import { createLocationCallback } from "~/hooks/createLocationCallback";
import AppearingText from "~/components/AppearingText";
import { Aa } from "~/components/Aa";
import Alpha from "~/components/Alpha";

export default function Home() {
  createLocationCallback();

  return (
    <main class="py-20  h-[300vh]">
      <Title>About</Title>
      <AppearingText>About</AppearingText>

      <Alpha>
        <Aa to="/">To About Page</Aa>
      </Alpha>
    </main>
  );
}
