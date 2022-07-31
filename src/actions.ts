export const clickOutside = (
  node: HTMLElement,
  handler: () => void,
): {
  destroy(): void
} => {
  let firstClick = true
  let clickedOnNode = false

  node.addEventListener('click', (): void => {
    clickedOnNode = true
  })

  const handleBodyClick = (): void => {
    if (firstClick || clickedOnNode) {
      firstClick = false
      clickedOnNode = false
      return
    }

    handler()
  }

  document.body.addEventListener('click', handleBodyClick)

  return {
    destroy(): void {
      document.body.removeEventListener('click', handleBodyClick)
    },
  }
}

export const portal = (
  node: HTMLElement,
): {
  destroy(): void
} => {
  document.body.appendChild(node)
  return {
    destroy(): void {
      node.remove()
    },
  }
}
