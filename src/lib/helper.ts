export function calculateSubtotal(unitPrice: number, quantity: number): number {
  return unitPrice * quantity;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}