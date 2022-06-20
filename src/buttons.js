import { ICONS } from "./constants.js";

const toggleHighlighted = (icon, show) =>
  document
    .querySelector(`${ICONS[icon]}`)
    .classList.toggle("highlighted", show);

export default function initButtons(handleUserActions) {
  let selectedIcon = 0;

  function buttonClick({ target }) {
    if (target.classList.consist("left-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (2 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    }
    if (target.classList.consist("right-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      handleUserActions(ICONS[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
