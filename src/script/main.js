const tasks = [];
const categories = [];
const RENDER_EVENT = 'render-tasks';

document.addEventListener('DOMContentLoaded', function () {
  displayCreateTaskForm();
  displayCreateCategoryForm();
  sidebarHandler();
  checkTaskContainer();
  const submitCategory = document.getElementById('btn-submit-category');
  submitCategory.addEventListener('click', (event) => {
    event.preventDefault();
    addCategory();
  });
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
    doContainer: document.getElementById('do-container'),
    scheduleContainer: document.getElementById('schedule-container'),
  };
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

function showForm(overlay, form) {
  overlay.classList.remove('hidden');
  form.classList.remove('hidden');
}

function hideForm(overlay, form) {
  overlay.classList.add('hidden');
  form.classList.add('hidden');
}

function displayCreateCategoryForm() {
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

function checkTaskContainer() {
  const { doContainer, scheduleContainer } = getUiElement();
  const taskDoContainer = doContainer.querySelectorAll('div');
  const taskScheduleContainer = scheduleContainer.querySelectorAll('div');
  let emptyTaskMessage = doContainer.querySelector('.no-task-message');

  if (taskDoContainer.length === 0) {
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

  if (taskScheduleContainer.length === 0) {
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
    scheduleContainer.append(emptyMessage);
  } else {
    if (emptyTaskMessage) {
      emptyTaskMessage.remove();
    }
  }
}

function closeInputTaskForm(element) {
  element.classList.remove('opacity-100', 'translate-y-0');
  element.classList.add('opacity-0', 'translate-y-5');
  setTimeout(() => {
    element.style.display = 'none'; // Sembunyikan form setelah animasi
  }, 300);
}

// Category
function addCategory() {
  const title = document.getElementById('input-category-title');
  const icon = document.getElementById('input-category-icon');

  const generatedId = generateId();
  const categoryObject = generateCategoryObject(
    generatedId,
    title.value,
    icon.value
  );

  categories.push(categoryObject);
  console.log(categories);
  renderSubmittedCategory(categories);
}

function generateCategoryObject(id, title, icon) {
  return {
    id,
    title,
    icon,
  };
}

function renderSubmittedCategory(categoryList = categories) {
  const categoriesContainer = document.getElementById('list-categories');

  categoriesContainer.innerText = '';

  for (const categoriesItem of categoryList) {
    const categoryElement = makeCategory(categoriesItem);
    categoriesContainer.append(categoryElement);
  }
}

function makeCategory(categoryObject) {
  const container = document.createElement('a');
  const categoryIcon = document.createElement('span');
  const categoryTitle = document.createElement('span');
  const categoryTaskCount = document.createElement('span');

  const classCategoryTaskCount = [
    'inline-flex',
    'items-center',
    'justify-center',
    'w-3',
    'h-3',
    'p-3',
    'ms-3',
    'text-sm',
    'font-medium',
    'text-blue-800',
    'bg-blue-100',
    'rounded-full',
    'dark:bg-blue-900',
    'dark:bg-blue-900',
    'dark:text-blue-300',
  ];

  const classCategoryItem = [
    'flex',
    'items-center',
    'p-2',
    'text-gray-900',
    'rounded-lg',
    'dark:text-white',
    'hover:bg-gray-100',
    'dark:hover:bg-gray-700',
    'group',
  ];

  categoryIcon.innerText = categoryObject.icon;

  categoryTitle.classList.add('flex-1', 'ms-3', 'whitespace-nowrap');
  categoryTitle.innerText = categoryObject.title;

  categoryTaskCount.classList.add(...classCategoryTaskCount);
  categoryTaskCount.innerText = 3;

  container.classList.add(...classCategoryItem);
  container.append(categoryIcon, categoryTitle, categoryTaskCount);

  return container;
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
  clearTaskInputs();
  // document.dispatchEvent(RENDER_EVENT);
}

function clearTaskInputs() {
  const formContainer = document.getElementById('taskForm');
  document.getElementById('inputTitle').value = '';
  document.getElementById('inputCategory').value = '';
  const taskSection = document.querySelectorAll(
    'input[name="input-task-section"]'
  );

  taskSection.forEach((radio) => (radio.checked = false));
  closeInputTaskForm(formContainer);
}

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

function renderTasks(tasklist = tasks) {
  const { doContainer, scheduleContainer } = getUiElement();

  doContainer.innerText = '';
  scheduleContainer.innerText = '';

  for (const taskItem of tasklist) {
    const taskElement = makeTask(taskItem);
    if (taskElement.selectedTaskSection == 'task-do-section') {
      doContainer.append(taskElement);
    } else
      (error) => {
        console.log('error: ', error);
      };

    if (taskElement.selectedTaskSection == 'task-schedule-section') {
      scheduleContainer.append(taskElement);
    } else
      (error) => {
        console.log('error: ', error);
      };
  }
}

function makeTask(taskObject) {
  const classTaskContainer = [
    'mt-3',
    'flex',
    'w-full',
    'bg-slate-200',
    'p-2',
    'rounded-md',
    'items-center',
    'group',
  ];
  const classTaskCheckbox = [
    'w-6',
    'h-6',
    'border-2',
    'border-blue-500',
    'cursor-pointer',
    'rounded-sm',
    'bg-white',
  ];

  const classBtnOpenTask = [
    'px-2',
    'bg-gray-400',
    'group-hover:bg-gray-500',
    'rounded-md',
    'opacity-0',
    'group-hover:opacity-100',
    'transition-opacity',
    'duration-75',
  ];

  const classBtnTask = ['p-1', 'rounded-md'];

  const taskCheckbox = document.createElement('input');
  taskCheckbox.setAttribute('type', 'checkbox');
  taskCheckbox.classList.add(...classTaskCheckbox);

  const titleLabel = document.createElement('label');
  titleLabel.innerText = taskObject.title;
  titleLabel.classList.add('ml-2', 'flex-1');

  const taskContainer = document.createElement('div');
  taskContainer.classList.add(...classTaskContainer);
  taskContainer.append(taskCheckbox, titleLabel);

  const btnOpenTask = document.createElement('a');
  btnOpenTask.classList.add(...classBtnOpenTask);
  btnOpenTask.innerText = 'Open';

  const btnEditTask = document.createElement('a');
  btnEditTask.classList.add(
    ...classBtnTask,
    'bg-yellow-300',
    'hover:bg-yellow-500'
  );
  const iconEdit = document.createElement('i');
  iconEdit.setAttribute('data-feather', 'edit');
  btnEditTask.append(iconEdit);

  const btnDeleteTask = document.createElement('a');
  btnDeleteTask.classList.add(
    ...classBtnTask,
    'bg-red-300',
    'hover:bg-red-500'
  );
  const iconDelete = document.createElement('i');
  iconDelete.setAttribute('data-feather', 'trash');
  btnDeleteTask.append(iconDelete);

  const btnTaskContainer = document.createElement('div');
  btnTaskContainer.classList.add('flex', 'items-end', 'gap-2');
  btnTaskContainer.append(btnOpenTask, btnEditTask, btnDeleteTask);

  taskContainer.append(btnTaskContainer);
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(tasks);
  renderTasks();
});
