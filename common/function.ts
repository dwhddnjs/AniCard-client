import TopIcon from "@/public/images/top_icon_p.svg";
import JglIcon from "@/public/images/jgl_icon_p.svg";
import MidIcon from "@/public/images/mid_icon_p.svg";
import AdIcon from "@/public/images/ad_icon_p.svg";
import SptIcon from "@/public/images/spt_icon_p.svg";

export const removeHtmlAndQuote = (text: string) => {
  const result = text.replace(/<\/?b>/g, "").replace(/&quot;/g, "");

  return result.replace(/LCK/g, "LCK");
};

export const renderPositionImg = (position: string) => {
  let result;
  switch (position) {
    case "top":
      result = TopIcon;
      break;
    case "jgl":
      result = JglIcon;
      break;
    case "mid":
      result = MidIcon;
      break;
    case "ad":
      result = AdIcon;
      break;
    default:
      result = SptIcon;
      break;
  }
  return result;
};
