const validateCreateOrder = (body: any): string | null => {
  const { userId, orderType, crypto, fiat, price, amount } = body;
  const cryptoSet = new Set(["BTC", "ETH", "XRP", "DOGE"]);
  const fiatSet = new Set(["THB", "USD"]);

  if (
    !userId ||
    !orderType ||
    !crypto ||
    !fiat ||
    price === undefined ||
    amount === undefined
  ) {
    return "userId, orderType, crypto, fiat, price, amount required";
  }

  if (!cryptoSet.has(crypto)) {
    return "Invalid crypto";
  }

  if (!fiatSet.has(fiat)) {
    return "Invalid fiat";
  }

  return null;
};

export default validateCreateOrder;
