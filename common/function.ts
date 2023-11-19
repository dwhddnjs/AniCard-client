export const convertPackLabel = (label: string) => {
  let result;
  switch (label) {
    case "유니크 팩":
      result = "unique";
      break;

    case "에픽 팩":
      result = "epic";
      break;

    default:
      result = "normal";
      break;
  }
  return result;
};

export const removeHtmlAndQuote = (text: string) => {
  const result = text.replace(/<\/?b>/g, "").replace(/&quot;/g, "");

  return result.replace(/LCK/g, "LCK");
};
