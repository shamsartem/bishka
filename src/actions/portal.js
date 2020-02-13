export default function portal(node) {
  document.body.appendChild(node);
  return {
    destroy() {
      node.remove();
    },
  };
}
