import Aa from "./Aa";

export const Nav = () => {
  return (
    <nav class="fixed left-0 top-0 z-[100] flex w-screen items-center justify-between px-gx py-4">
      <Aa to="/">
        <p>LOGO</p>
      </Aa>

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
          <Aa to="/lib" class="px-3">
            Lib
          </Aa>
        </li>
      </ul>
    </nav>
  );
};
