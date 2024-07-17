import { Scroll } from "~/app/scroll";
import { viewport } from "~/stores/viewport";

export const clientRect = (element) => {
  const bounds = element.getBoundingClientRect();
  const { scroll } = Scroll.lenis;

  return {
    // screen
    top: bounds.top + scroll,
    bottom: bounds.bottom + scroll,
    width: bounds.width,
    height: bounds.height,
    left: bounds.left,
    right: bounds.right,
    wh: viewport.size.height,
    ww: viewport.size.width,
    offset: bounds.top + scroll,
    // centery: bounds.top + scroll + bounds.height / 2, // check if correct
    // centerx: bounds.left + bounds.width / 2, // check if correct
  };
};
