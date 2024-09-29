import Aa from "./Aa";
import SocialSprite from "~/components/svg/socialSprite.svg?component-solid";

export const Nav = () => {
  return (
    <nav class="fixed left-0 top-0 z-[100] flex w-screen items-center justify-between px-gx py-6">
      <Aa to="/">
        <p>LOGO</p>
      </Aa>

      <SocialSprite class="size-[2em]" />

      <ul class="flex justify-between">
        <li>
          <Aa to="/" class="px-3">
            Index
          </Aa>
        </li>
        <li>
          <Aa to="/about" class="px-3">
            About
          </Aa>
        </li>
        <li>
          <Aa to="/animation" class="px-3">
            Animation
          </Aa>
        </li>
        <li>
          <Aa to="/webgl" class="px-3">
            WebGl
          </Aa>
        </li>
        <li>
          <Aa to="/data-loading" class="px-3">
            Data Loading
          </Aa>
        </li>
        <li>
          <Aa to="/protected" class="px-3">
            Protected
          </Aa>
        </li>
      </ul>
    </nav>
  );
};
