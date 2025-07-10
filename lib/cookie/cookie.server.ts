import { cookies } from "next/headers";

export const get_currency_key = () => {
  const country = cookies().get("country")?.value;
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
