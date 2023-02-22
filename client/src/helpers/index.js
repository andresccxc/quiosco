export const formatPrice = (money) => {
  return money.toLocaleString("es-US", {
    style: "currency",
    currency: "USD",
  });
};
