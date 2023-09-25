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
