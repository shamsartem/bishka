export default new Promise((resolve) => {
  // eslint-disable-next-line no-undef
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1kmC3_ayBMAS5xks7ba11GwXdYfS7Bm4LEWFif_yeLD4/edit?usp=sharing',
    callback: (data) => resolve({
      pages: data.pages.elements.map((page) => ({
        ...page,
        images: data.images.elements.filter((image) => image.page === page.page),
      })),
      contact: data.contact.elements,
    }),
    simpleSheet: false,
  });
});
