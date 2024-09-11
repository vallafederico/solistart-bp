import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";
import Section from "~/components/Section";
import Aa from "~/components/Aa";

import { setLocationCallback } from "~/hooks/useLocationCallback";
import { animateAlpha } from "~/animation/alpha.js";
import Track from "~/components/Track";
import { createAsync, redirect } from "@solidjs/router";
import { createEffect } from "solid-js";
import { cache } from "@solidjs/router";
import { parseCookies } from "vinxi/http";

async function wait(time = 1): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * time);
  });
}

const getData = cache(async () => {
  "use server";

  console.log("...");
  await wait(1);
  console.log("done");

  const cookies = parseCookies();
  console.log("cookies", cookies);

  if (!cookies.auth) {
    console.log("no auth, redirecting ...");
    return redirect("/protected/");
  }

  return {
    hello: "hello",
    also: "world",
  };
}, "test");

export default function Test() {
  const data = createAsync(async () => await getData());

  setLocationCallback();

  createEffect(() => {
    console.log("1", data());
  });

  return (
    <main class="min-h-[100vh] pt-20">
      <Section class="px-gx">
        <div>baseline test1 route</div>
        <div>{data()?.hello}</div>

        <a href="/protected/test2">to 2</a>
        <div class="py-2">
          <a href="/protected/">back</a>
        </div>
      </Section>
    </main>
  );
}

export { getData };
