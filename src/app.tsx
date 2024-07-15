import "./app.css";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";

import { Nav } from "./components/Nav";
import { Scroll } from "./components/Scroll";
import { useLocationCallback } from "./hooks/useLocationCallback";

export default function App() {
  useLocationCallback();

  return (
    <Scroll>
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
    </Scroll>
  );
}
