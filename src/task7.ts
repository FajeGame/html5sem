function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) {
    throw new Error("chunkSize must be > 0");
  }
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

// Пример
console.log(chunkArray([1, 2, 3, 4, 5], 2)); 
// [[1, 2], [3, 4], [5]]