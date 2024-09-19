import { Title } from "@solidjs/meta";

import Section from "~/components/Section";
import Aa from "~/components/Aa";
import { json } from "@solidjs/router";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";

import { createAsync } from "@solidjs/router";
import { createEffect } from "solid-js";
import { cache } from "@solidjs/router";

async function wait(time = 1): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * time);
  });
}

const getContent = cache(async () => {
  "use server";

  await wait(2);
  return {
    hello: "world",
  };
}, "content");

export const Page = {
  load: async () => await getContent(),
};

export default function Test2() {
  setLocationCallback();
  const data = createAsync(async () => await getContent());

  createEffect(() => {
    console.log("data", data());
  });

  return (
    <main class="min-h-[100vh] pt-20">
      <Section class="px-gx">
        <div>The next bit is data</div>
        <div>{data()?.hello}</div>
      </Section>
    </main>
  );
}
