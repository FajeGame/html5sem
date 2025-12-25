function formatInput(input: number): string;
function formatInput(input: string): string;
function formatInput(input: Date): string;
function formatInput(input: number | string | Date): string {
  if (typeof input === 'number') {
    return `Число: ${input.toFixed(2)}`;
  } else if (typeof input === 'string') {
    return `Строка: "${input}"`;
  } else if (input instanceof Date) {
    return `Дата: ${input.toISOString().split('T')[0]}`;
  }
  // Проверка полноты (never)
  const _exhaustiveCheck: never = input;
  throw new Error(`Необработанный тип: ${_exhaustiveCheck}`);
}

// Примеры
console.log(formatInput(42));               // "Число: 42.00"
console.log(formatInput("hello"));          // "Строка: "hello""
console.log(formatInput(new Date(2025, 0, 1))); // "Дата: 2025-01-01"