  
import Cookies from 'js-cookie';

export const get_currency_key = () => {
  const country = Cookies.get("country");
  switch (country ?? "1") {
    case "1":
      return "ر.س";
    case "2":
      return "د.إ";
    default:
      return "رس";
      break;
  }
};
