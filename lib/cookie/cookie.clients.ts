  
 
export const get_currency_key = (country?:any) => { 
  switch (country) {
    case "1":
      return "ر.س";
    case "2":
      return "د.إ";
    default:
      return "~~";
      break;
  }
};
