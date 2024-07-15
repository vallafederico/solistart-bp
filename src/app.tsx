import "./app.css";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { Nav } from "./components/Nav";
// import { Scroll } from "./components/Scroll";
import { Scroll } from "./animation/scroll";
import { useLocationCallback } from "./hooks/useLocationCallback";
import { createEffect } from "solid-js";

export default function App() {
  useLocationCallback();
  createEffect(() => {
    Scroll.init();
  });

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <Nav />

          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <Suspense fallback={<div>loading things</div>}>
        <FileRoutes />
      </Suspense>
    </Router>
  );
}
