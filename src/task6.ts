type Invoice = { id: string; amount: number; status: "paid" | "free" };

function sumByStatus(invoices: readonly Invoice[]): { paid: number; free: number } {
  return invoices.reduce(
    (acc, inv) => {
      if (inv.status === "paid") acc.paid += inv.amount;
      else acc.free += inv.amount;
      return acc;
    },
    { paid: 0, free: 0 }
  );
}

// Пример
const invoices: Invoice[] = [
  { id: "1", amount: 100, status: "paid" },
  { id: "2", amount: 50, status: "free" },
  { id: "3", amount: 200, status: "paid" }
];

console.log(sumByStatus(invoices)); // { paid: 300, free: 50 }