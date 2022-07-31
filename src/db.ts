import pagesFromJson from './db/pages.json' assert { type: 'json' }

export type Image = {
  featured: boolean
  fullscreen: boolean
  description: string
  fileName: string
  src: string
}

export type Page = {
  page: string
  description: string
  slug: string
  images: Array<Image>
}

export type Contact = {
  text: string
  link: string
  type: 'instagram' | 'telegram' | 'vk' | 'email' | 'address'
}

export const pages = pagesFromJson.map(
  (page): Page => ({
    ...page,
    images: page.images.map(
      (image): Image => ({
        ...image,
        src: `img/content/${image.fileName}`,
      }),
    ),
  }),
)

export const email: Contact = {
  type: 'email',
  text: 'bishkanguyen@gmail.com',
  link: 'mailto:bishkanguyen@gmail.com',
}

export const social: Array<Contact> = [
  {
    type: 'instagram',
    text: 'instagram',
    link: 'https://www.instagram.com/bebibishka',
  },
  {
    type: 'vk',
    text: 'vk',
    link: 'https://vk.com/bishkanguyen',
  },
]
