// @ts-ignore
import pagesData from './db-data/pages.csv'
// @ts-ignore
import imagesData from './db-data/images.csv'
// @ts-ignore
import contactsData from './db-data/contacts.csv'

const trimAllFields = (obj: { [key: string]: string }) =>
  Object.entries(obj).reduce(
    (acc, [k, v]) => ({ ...acc, [k.trim()]: v.trim() }),
    {},
  )

export type Image = {
  page: string
  featured: string
  fullscreen: string
  description: string
  src: string
  previewSrc: string
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

export const images = imagesData.map((image, index) => ({
  id: index,
  ...trimAllFields(image),
  src: `img/content/${image.src.trim()}`,
}))

export const pages: Array<Page> = pagesData.map((page) => ({
  ...trimAllFields(page),
  images: images.filter((image) => image.page === page.page),
}))

const trimmedContacts = contactsData.map((contact) => trimAllFields(contact))

export const email: Contact | undefined = trimmedContacts.find(
  (contact) => contact.type === 'email',
)
export const address: Contact | undefined = trimmedContacts.find(
  (contact) => contact.type === 'address',
)
export const social: Array<Contact> = trimmedContacts.filter((contact) =>
  ['vk', 'telegram', 'instagram'].includes(contact.type),
)
