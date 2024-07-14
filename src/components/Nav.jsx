import { Aa } from "./Aa";

export const Nav = () => {
  return (
    <nav class="fixed top-0 left-0 px-gx flex items-center justify-between w-screen py-2">
      <p>LOGO</p>

      <ul class="flex justify-between">
        <li>
          <Aa to="/" class="px-3" doesAnimate={false}>
            Index
          </Aa>
        </li>
        <li>
          <Aa to="/about" class="px-3" doesAnimate={false}>
            About
          </Aa>
        </li>
      </ul>
    </nav>
  );
};
