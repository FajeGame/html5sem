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
  document.body.className = `${theme}-theme`;
  els.themeBtn.querySelector('.theme-toggle__icon').textContent = theme === 'light' ? '🌙' : '☀️';
}

// Переключение темы
function toggleTheme() {
  const theme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  document.body.className = `${theme}-theme`;
  saveTheme(theme);
  els.themeBtn.querySelector('.theme-toggle__icon').textContent = theme === 'light' ? '🌙' : '☀️';
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
  els.modal.classList.add('modal--active');
  els.input.focus();
}

function closeModal() {
  els.modal.classList.remove('modal--active');
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
  li.className = `todo-item ${todo.completed ? 'todo-item--completed' : ''}`;
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-item__checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => toggleTodo(todo.id));
  
  const text = document.createElement('span');
  text.className = 'todo-item__text';
  text.textContent = todo.text;
  
  const actions = document.createElement('div');
  actions.className = 'todo-item__actions';
  
  const editBtn = document.createElement('button');
  editBtn.className = 'btn btn--icon';
  editBtn.innerHTML = '✏️';
  editBtn.addEventListener('click', () => openModal(todo.id));
  
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn--icon';
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
  if (e.target === els.modal || e.target.classList.contains('modal__overlay')) {
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