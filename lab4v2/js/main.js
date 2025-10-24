// Состояние
const state = {
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
  editingId: null,
  searchQuery: ''
};

// Элементы
const els = {
  addBtn: document.getElementById('addTaskBtn'),
  modal: document.getElementById('taskModal'),
  closeBtn: document.getElementById('closeModalBtn'),
  cancelBtn: document.getElementById('cancelBtn'),
  form: document.getElementById('taskForm'),
  input: document.getElementById('taskName'),
  modalTitle: document.getElementById('modalTitle'),
  activeList: document.getElementById('activeTodos'),
  completedList: document.getElementById('completedTodos'),
  searchInput: document.getElementById('searchInput'),
  themeBtn: document.querySelector('.theme-toggle'),
  emptyMsg: document.getElementById('emptyMessage'),
  todosContainer: document.getElementById('todosContainer')
};

// Сохранение задач
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(state.todos));
}

// Сохранение темы
function saveTheme(theme) {
  localStorage.setItem('theme', theme);
}

// Загрузка темы
function loadTheme() {
  const theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.documentElement.classList.add('dark');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.documentElement.classList.remove('dark');
  }
  els.themeBtn.querySelector('.theme-toggle__icon').textContent = theme === 'light' ? '🌙' : '☀️';
}

// Переключение темы
function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  if (isLight) {
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
    document.documentElement.classList.add('dark');
    saveTheme('dark');
  } else {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    document.documentElement.classList.remove('dark');
    saveTheme('light');
  }
  els.themeBtn.querySelector('.theme-toggle__icon').textContent = isLight ? '☀️' : '🌙';
}

// Модальное окно
function openModal(id = null) {
  state.editingId = id;
  if (id) {
    const todo = state.todos.find(t => t.id === id);
    if (todo) {
      els.input.value = todo.text;
      els.modalTitle.textContent = 'Редактировать задачу';
    }
  } else {
    els.input.value = '';
    els.modalTitle.textContent = 'Добавить задачу';
  }
  els.modal.classList.remove('opacity-0', 'invisible');
  els.modal.classList.add('opacity-100', 'visible');
  els.modal.querySelector('.transform').classList.remove('scale-90');
  els.modal.querySelector('.transform').classList.add('scale-100');
  els.input.focus();
}

function closeModal() {
  els.modal.classList.add('opacity-0', 'invisible');
  els.modal.classList.remove('opacity-100', 'visible');
  els.modal.querySelector('.transform').classList.add('scale-90');
  els.modal.querySelector('.transform').classList.remove('scale-100');
  els.form.reset();
  state.editingId = null;
}

// Обработка формы
function handleSubmit(e) {
  e.preventDefault();
  const text = els.input.value.trim();
  if (!text) return;
  
  if (state.editingId) {
    const todo = state.todos.find(t => t.id === state.editingId);
    if (todo) todo.text = text;
  } else {
    state.todos.push({ id: Date.now(), text, completed: false });
  }
  
  saveTodos();
  updateUI();
  closeModal();
}

// Удаление задачи
function deleteTodo(id) {
  state.todos = state.todos.filter(t => t.id !== id);
  saveTodos();
  updateUI();
}

// Переключение выполнения
function toggleTodo(id) {
  const todo = state.todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    updateUI();
  }
}

// Создание элемента задачи
function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = `flex items-center justify-between p-6 mb-3 rounded-lg transition-all duration-300 bg-light-surface border border-light-border dark:bg-dark-surface dark:border-dark-border ${todo.completed ? 'opacity-60' : ''}`;
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'w-5 h-5 cursor-pointer mr-6';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => toggleTodo(todo.id));
  
  const text = document.createElement('span');
  text.className = `flex-1 text-base break-words ${todo.completed ? 'line-through' : ''}`;
  text.textContent = todo.text;
  
  const actions = document.createElement('div');
  actions.className = 'flex gap-2 ml-2';
  
  const editBtn = document.createElement('button');
  editBtn.className = 'p-2 min-w-8 h-8 rounded border flex items-center justify-center border-light-border bg-light-bg hover:bg-light-surface dark:border-dark-border dark:bg-dark-bg dark:hover:bg-dark-surface transition-all duration-300';
  editBtn.innerHTML = '✏️';
  editBtn.addEventListener('click', () => openModal(todo.id));
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'p-2 min-w-8 h-8 rounded border flex items-center justify-center border-light-border bg-light-bg hover:bg-light-surface dark:border-dark-border dark:bg-dark-bg dark:hover:bg-dark-surface transition-all duration-300';
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.addEventListener('click', () => {
    if (confirm('Удалить задачу?')) deleteTodo(todo.id);
  });
  
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(actions);
  
  return li;
}

// Обновление UI
function updateUI() {
  const filtered = state.searchQuery 
    ? state.todos.filter(t => t.text.toLowerCase().includes(state.searchQuery))
    : state.todos;
  
  const active = filtered.filter(t => !t.completed);
  const completed = filtered.filter(t => t.completed);
  
  els.activeList.innerHTML = '';
  els.completedList.innerHTML = '';
  
  if (state.todos.length === 0) {
    els.emptyMsg.classList.remove('hidden');
    els.todosContainer.classList.add('hidden');
  } else {
    els.emptyMsg.classList.add('hidden');
    els.todosContainer.classList.remove('hidden');
    active.forEach(t => els.activeList.appendChild(createTodoElement(t)));
    completed.forEach(t => els.completedList.appendChild(createTodoElement(t)));
  }
}

// События
els.addBtn.addEventListener('click', () => openModal());
els.closeBtn.addEventListener('click', closeModal);
els.cancelBtn.addEventListener('click', closeModal);
els.modal.addEventListener('click', (e) => {
  if (e.target === els.modal || e.target.classList.contains('absolute')) {
    closeModal();
  }
});
els.form.addEventListener('submit', handleSubmit);
els.searchInput.addEventListener('input', (e) => {
  state.searchQuery = e.target.value.toLowerCase();
  updateUI();
});
els.themeBtn.addEventListener('click', toggleTheme);

// Инициализация
loadTheme();
updateUI();