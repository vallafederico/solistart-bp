import { Title } from "@solidjs/meta";

import Section from "~/components/Section";
import Aa from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";
import Track from "~/components/Track";
import { createAsync } from "@solidjs/router";
import { createEffect } from "solid-js";
import { cache } from "@solidjs/router";

import { getData } from "./test";

export default function Test2() {
  const data = createAsync(async () => await getData());
  setLocationCallback();

  createEffect(() => {
    console.log("2", data());
  });

  return (
    <main class="min-h-[100vh] pt-20">
      <Section class="px-gx">
        <div>test2 route</div>
        <div>{data()?.hello}</div>
        <a href="/protected/test"> to 1</a>

        <div class="py-2">
          <a href="/protected/">back</a>
        </div>
      </Section>
    </main>
  );
}
