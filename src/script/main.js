const tasks = [];
const RENDER_EVENT = 'render-tasks';

document.addEventListener('DOMContentLoaded', function () {
  displayCreateTaskForm();
  displayCreateCategory();
  sidebarHandler();
  checkTaskContainer();
  const submitTask = document.getElementById('btnSubmitTask');
  submitTask.addEventListener('click', (event) => {
    event.preventDefault();
    addTask();
  });
});

function getUiElement() {
  return {
    // UI
    sidebar: document.getElementById('sidebar'),
    btnBurger: document.getElementById('btnBurger'),
    doContainer: document.getElementById('doContainer'),
  };
}

function checkTaskContainer() {
  const { doContainer } = getUiElement();
  const task = doContainer.querySelectorAll('div');
  let emptyTaskMessage = doContainer.querySelector('.no-task-message');

  if (task.length === 0) {
    const emptyMessage = document.createElement('p');
    const emptyMessageClass = [
      'bg-slate-200',
      'p-1',
      'rounded-md',
      'text-sm',
      'mt-2',
      'no-task-message',
    ];
    emptyMessage.innerText = 'No task';
    emptyMessage.classList.add(...emptyMessageClass);
    doContainer.append(emptyMessage);
  } else {
    if (emptyTaskMessage) {
      emptyTaskMessage.remove();
    }
  }
}

function showForm(overlay, form) {
  overlay.classList.remove('hidden');
  form.classList.remove('hidden');
}

function hideForm(overlay, form) {
  overlay.classList.add('hidden');
  form.classList.add('hidden');
}

function displayCreateCategory() {
  const formCreateCategory = document.getElementById('formCreateCategory');
  const overlay = document.querySelector('[node-create-form]');

  document.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    if (action === 'create') {
      showForm(overlay, formCreateCategory);
    } else if (action === 'cancel') {
      hideForm(overlay, formCreateCategory);
    }
  });
}

function displayCreateTaskForm() {
  // Handle submit form
  const submitButton = document.getElementById('btnSubmitTask');
  submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask();
  });

  const form = document.getElementById('taskForm');
  const showFormButton = document.getElementById('showFormButton');

  showFormButton.addEventListener('click', function () {
    if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block'; // Tampilkan form
      setTimeout(() => {
        form.classList.remove('opacity-0', 'translate-y-5');
        form.classList.add('opacity-100', 'translate-y-0');
      }, 10); // Tambahkan sedikit delay agar efek transisi bekerja
    } else {
      closeInputTaskForm(form);
    }
  });
}

function closeInputTaskForm(element) {
  element.classList.remove('opacity-100', 'translate-y-0');
  element.classList.add('opacity-0', 'translate-y-5');
  setTimeout(() => {
    element.style.display = 'none'; // Sembunyikan form setelah animasi
  }, 300);
}

function sidebarHandler() {
  const { btnBurger, sidebar } = getUiElement();
  const mainContainer = document.getElementById('main-container');

  mainContainer.addEventListener('click', () => {
    btnBurger.classList.remove('hidden');
    sidebar.classList.remove('translate-x-0');
  });
  btnBurger.addEventListener('click', () => {
    btnBurger.classList.add('hidden');
    sidebar.classList.add('translate-x-0');
  });
}

function addTask() {
  const title = document.getElementById('inputTitle');
  const category = document.getElementById('inputCategory');
  const taskSection = document.querySelector(
    'input[name="input-task-section"]:checked'
  );
  const selectedTaskSection = taskSection ? taskSection.value : null;

  const generatedId = generateId();
  const taskObject = generateTaskObject(
    generatedId,
    title.value,
    category.value,
    selectedTaskSection
  );

  tasks.push(taskObject);
  console.log(tasks);
  clearTaskInputs()
  // document.dispatchEvent(RENDER_EVENT);
}

function clearTaskInputs() {
  const formContainer = document.getElementById('taskForm')
  document.getElementById('inputTitle').value = '';
  document.getElementById('inputCategory').value = '';
  const taskSection = document.querySelectorAll(
    'input[name="input-task-section"]'
  );

  taskSection.forEach((radio) => (radio.checked = false));
  closeInputTaskForm(formContainer);
}

/* function closeInputTaskForm() {
  const inputTaskForm = document.getElementById('taskForm')
  inputTaskForm.classList
} */

function generateId() {
  return +new Date();
}

function generateTaskObject(id, title, category, taskSection) {
  return {
    id,
    title,
    category,
    taskSection,
  };
}

function renderTasks(tasklist = tasks) {}

document.addEventListener(RENDER_EVENT, function () {
  console.log(tasks);
  renderTasks();
});
