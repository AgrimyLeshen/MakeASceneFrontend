import LayoutHero from "./layouts/LayoutHero";
import LayoutCompact from "./layouts/LayoutCompact";
import LayoutSplit from "./layouts/LayoutSplit";

const LayoutRegistry = {
  hero: LayoutHero,
  compact: LayoutCompact,
  split: LayoutSplit,
};

export default LayoutRegistry;