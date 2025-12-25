type TagList = readonly string[];

function addTag(tags: TagList, tag: string): TagList {
  return [...tags, tag];
}

function removeTag(tags: TagList, tag: string): TagList {
  return tags.filter(t => t !== tag);
}

function mergeTags(tags1: TagList, tags2: TagList): TagList {
  return [...new Set([...tags1, ...tags2])]; // без дубликатов
}

// Пример
const tags: TagList = ['vue', 'typescript'];
const withNew = addTag(tags, 'node');
const without = removeTag(withNew, 'vue');
const merged = mergeTags(without, ['pinia', 'vite']);

console.log(merged); // ['typescript', 'node', 'pinia', 'vite']