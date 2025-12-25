// Интерфейс репозитория
interface Repository<T> {
  create(item: T): void;
  findById(id: string): T | undefined;
  update(id: string, item: Partial<T>): void;
  delete(id: string): void;
}

// Сущность
type Book = { id: string; title: string; author: string };

// Реализация
class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private storage = new Map<string, T>();

  create(item: T): void {
    this.storage.set(item.id, item);
  }

  findById(id: string): T | undefined {
    return this.storage.get(id);
  }

  update(id: string, item: Partial<T>): void {
    const existing = this.storage.get(id);
    if (existing) {
      this.storage.set(id, { ...existing, ...item });
    }
  }

  delete(id: string): void {
    this.storage.delete(id);
  }
}

// DeepReadonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

function deepFreeze<T>(obj: T): DeepReadonly<T> {
  if (obj === null || typeof obj !== "object") return obj as any;
  Object.freeze(obj);
  Object.values(obj).forEach(val => {
    if (typeof val === "object" && val !== null && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  });
  return obj as DeepReadonly<T>;
}

// Пример
const repo = new MemoryRepository<Book>();
repo.create({ id: "1", title: "1984", author: "Orwell" });
repo.update("1", { title: "Animal Farm" });

const book = repo.findById("1");
if (book) {
  const frozenBook = deepFreeze(book);
  // frozenBook.title = "test"; // Ошибка!
  console.log(frozenBook);
}