function trimAllFields(obj) {
  return Object.entries(obj).reduce((acc, [k, v]) => ({ ...acc, [k.trim()]: v.trim() }), {});
}

export default new Promise((resolve) => {
  // eslint-disable-next-line no-undef
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1kmC3_ayBMAS5xks7ba11GwXdYfS7Bm4LEWFif_yeLD4/edit?usp=sharing',
    callback: (data) => resolve({
      pages: data.pages.elements.map((page) => ({
        ...trimAllFields(page),
        images: data.images.elements
          .filter((image) => image.page === page.page)
          .map((i) => trimAllFields(i)),
      })),
      contact: data.contact.elements.map((i) => trimAllFields(i)),
    }),
    simpleSheet: false,
  });
});
