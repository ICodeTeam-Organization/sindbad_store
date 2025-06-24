export const calculateTotalPrice = (
  items: { priceAfterDiscount: number | null; price: number; quantity: number }[]
): number => {
  return items?.reduce((total, item) => {
    const price = item.priceAfterDiscount || item.price;
    return total + (price * item?.quantity);
  }, 0);
};

export const calculateBonus = (
  quantity: number,
  amountYouBuy: number,
  amountYouGet: number
) => {
  if (!!amountYouBuy && !!amountYouGet) {
    return Math.floor(quantity / amountYouBuy) * amountYouGet;
  }
  return 0;
};

// Function to calculate the total shipping cost
export const calculateTotalShippingCost = (
  items: {
    shipCost: number;
    quantity: number;
    amountYouBuy: number;
    amountYouGet: number;
    extraQuantity?:number
  }[]
): number => {
  return items?.reduce((total, item) => {
    const shipCost = item.shipCost || 0;
    return (
      total +
      (shipCost *
        (item.quantity +
          (item.extraQuantity || calculateBonus(
            item.quantity,
            item.amountYouBuy || 0,
            item.amountYouGet || 0
          ) || 0)))
    );
  }, 0);
};

// Function to calculate the total discount
export const calculateTotalDiscount = (
  items: { priceAfterDiscount: number | null; price: number; quantity: number }[]
): number => {
  const totalOldPrice = items?.reduce((total, item) => {
    const oldPrice =
      item.priceAfterDiscount !== null && item.priceAfterDiscount < item.price
        ? item.price - item.priceAfterDiscount
        : 0;
    return total + oldPrice * item.quantity;
  }, 0);
  return totalOldPrice;
};

export const calculateFinalTotal = (
  items: {
    priceAfterDiscount: number;
    price: number;
    quantity: number;
    shipCost: number;
    amountYouGet: number;
    amountYouBuy: number;
    extraQuantity?:number
  }[]
): number => {
  const totalPrice = items?.reduce((total, item) => {
    const price = item.priceAfterDiscount || item.price || 0;
    return (
      total +
      price * item.quantity +
      item.shipCost *
        (item.quantity +
          (item.extraQuantity || calculateBonus(
            item.quantity,
            item.amountYouBuy || 0,
            item.amountYouGet || 0
          ) || 0))
    );
  }, 0);
  return totalPrice;
};
