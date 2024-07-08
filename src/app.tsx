import "./app.css";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, useTransition } from "solid-js";
import { Nav } from "./components/Nav";
import { Scroll } from "./components/Scroll";

export default function App() {
  const [isPending, start] = useTransition();

  setTimeout(() => {
    start(() => {
      console.log("done");
    });
  }, 2000);

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
