type UserId = string & { readonly brand: unique symbol };

function isUserId(value: unknown): value is UserId {
  if (typeof value !== 'string') return false;
  // Простая проверка UUID v4 (xxxx-xxxx-4xxx-yxxx-xxxx)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

function getUserProfile(id: UserId): string {
  return `Профиль пользователя с ID: ${id}`;
}

// Пример
const rawId = "123e4567-e89b-12d3-a456-426614174000";
if (isUserId(rawId)) {
  console.log(getUserProfile(rawId));
} else {
  console.log("Неверный ID");
}