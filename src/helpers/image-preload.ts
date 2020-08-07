export const loadImage = (src: string) => {
  return new Promise((resolve) => {
    const image = new Image()

    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
    image.style.display = 'none'

    window.document.body.appendChild(image)
  })
}

export const loadImages = (images: Array<string>) => {
  return Promise.all(images.map((image) => loadImage(image)))
}
