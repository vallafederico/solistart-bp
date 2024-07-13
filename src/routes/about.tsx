import { Title } from "@solidjs/meta";
import { createLocationCallback } from "~/hooks/createLocationCallback";
import AppearingText from "~/components/AppearingText";

export default function Home() {
  createLocationCallback();

  return (
    <main class="py-20  h-[300vh]">
      <Title>About</Title>
      <AppearingText>About</AppearingText>
    </main>
  );
}
