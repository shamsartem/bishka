const clickOutside = (node: HTMLElement, handler: () => void) => {
  let firstClick = true
  let clickedOnNode = false

  node.addEventListener('click', () => {
    clickedOnNode = true
  })

  const handleBodyClick = () => {
    if (firstClick || clickedOnNode) {
      firstClick = false
      clickedOnNode = false
      return
    }

    handler()
  }

  document.body.addEventListener('click', handleBodyClick)

  return {
    destroy() {
      document.body.removeEventListener('click', handleBodyClick)
    },
  }
}

export default clickOutside
