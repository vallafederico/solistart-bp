import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import { Aa } from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";
import { onTrack } from "~/animation";

export default function Home() {
  setLocationCallback();

  let track: HTMLElement;
  const animate = (self: HTMLElement) => {
    // onTrack(track, (value: any) => {
    //   console.log(value);
    // });
  };

  return (
    <main class="min-h-[200vh] pt-20">
      <Title>Home</Title>

      <Section class="">
        <div use:animateAlpha class="flex flex-col items-start gap-10 px-gx">
          <Counter />

          {/* track test */}

          <div ref={track} class="h-[100vh] w-full border">
            <div use:animate>HELLO MOVING</div>
          </div>

          {/* track test */}

          <Aa to="/about">To About Page </Aa>
        </div>
      </Section>
    </main>
  );
}
