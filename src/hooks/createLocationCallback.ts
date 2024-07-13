import { createEffect } from "solid-js";
import { useLocation, useNavigate } from "@solidjs/router";
import gsap from "~/gsap";

const transitionAnimation = async (callNavigation: Function) => {
  const main = document.querySelector("main");

  // (*) collect callbacks from store and await them
  await gsap.to(main, {
    autoAlpha: 0,
    duration: 0.6,
    ease: "expo.out",
  });
  // ...

  callNavigation();
};

const handleLinks = async (navigate: any, currentLocation: string) => {
  const links = [...document.querySelectorAll("a")];
  // (*) needs to filter for external links and only work on internal

  links.forEach((item, i) => {
    item.onclick = (e) => {
      if (item.pathname === currentLocation) return;
      e.preventDefault();

      transitionAnimation(() => {
        navigate(item.pathname);
      });
    };
  });
};

export function createLocationCallback(
  callback?: (location: Location) => void
) {
  const location = useLocation();
  const navigate = useNavigate();

  createEffect(() => {
    // console.log("G:location", location.pathname);

    // handleLinks(navigate, location.pathname);
    if (callback) callback(location);
  });
}
