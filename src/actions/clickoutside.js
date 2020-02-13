export default function clickoutside(node) {
  let firstClick = true;
  let clickedOnNode = false;

  node.addEventListener('click', () => {
    clickedOnNode = true;
  });

  function onBodyClick() {
    if (firstClick || clickedOnNode) {
      firstClick = false;
      clickedOnNode = false;
      return;
    }

    node.dispatchEvent(new CustomEvent('clickoutside'));
  }

  document.body.addEventListener('click', onBodyClick);

  return {
    destroy() {
      document.body.removeEventListener('click', onBodyClick);
    },
  };
}
