export const Nav = () => {
  return (
    <nav class="fixed top-0 left-0 px-gx flex items-center justify-between w-screen py-2">
      <p>logo</p>

      <ul class="flex justify-between">
        <li>
          <a class="px-3 py-2" href="/">
            Index
          </a>
        </li>
        <li>
          <a class="px-3 py-2" href="/about">
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};
