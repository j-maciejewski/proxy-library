export const textToSlug = (text: string) =>
  text.replaceAll(" ", "-").toLowerCase();
