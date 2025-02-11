// UI
export function getUiElement() {
  return {
    // UI
    sidebar: document.getElementById('sidebar'),
    btnBurger: document.getElementById('btnBurger'),

    // Category
    formCreateCategory: document.getElementById('formCreateCategory'),
    overlay: document.querySelector('[node-create-form]'),

    // Task
    doContainer: document.getElementById('do-container'),
    scheduleContainer: document.getElementById('schedule-container'),
    deletedContainer: document.getElementById('deleted-container'),
  };
}

export function sidebarHandler() {
  const { btnBurger, sidebar } = getUiElement();
  const mainContainer = document.getElementById('main-container');

  mainContainer.addEventListener('click', () => {
    btnBurger.classList.remove('hidden');
    sidebar.classList.remove('translate-x-0');
  });
  btnBurger.addEventListener('click', (event) => {
    event.stopPropagation();
    btnBurger.classList.add('hidden');
    sidebar.classList.add('translate-x-0');
  });
}

export function showCategoryForm(overlay, form) {
  overlay.classList.remove('hidden');
  form.classList.remove('hidden');
}

export function hideCategoryForm(overlay, form) {
  overlay.classList.add('hidden');
  form.classList.add('hidden');
}

export function displayCreateCategoryForm() {
  const { formCreateCategory, overlay } = getUiElement();

  document.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    if (action === 'create') {
      showCategoryForm(overlay, formCreateCategory);
    } else if (action === 'cancel') {
      hideCategoryForm(overlay, formCreateCategory);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideCategoryForm(overlay, formCreateCategory);
    }
  });
}

export function displayCreateTaskForm() {
  const form = document.getElementById('taskForm');
  const showFormButton = document.getElementById('showFormButton');
  const mainContainer = document.querySelector('main');

  showFormButton.addEventListener('click', function (event) {
    event.stopPropagation();
    if (form.style.display === 'none' || form.style.display === '') {
      form.style.display = 'block';
      setTimeout(() => {
        form.classList.remove('opacity-0', 'translate-y-5');
        form.classList.add('opacity-100', 'translate-y-0');
      }, 10);
    } else if (event.target === showFormButton) {
      closeInputTaskForm(form);
    }
  });

  document.addEventListener('click', function (event) {
    if (!form.contains(event.target) && event.target !== showFormButton) {
      closeInputTaskForm(form);
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeInputTaskForm(form);
    }
  });

  form.addEventListener('click', function (event) {
    event.stopPropagation();
  });
}

function checkForEmptyTask(checkElement, elementContainer) {
  const emptyTaskMessage = elementContainer.querySelector('.no-task-message');
  if (checkElement.length === 0) {
    if (!emptyTaskMessage) {
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
      elementContainer.append(emptyMessage);
    }
  } else if (emptyTaskMessage) {
    emptyTaskMessage.remove();
  }
}

export function checkTaskContainer() {
  const { doContainer, scheduleContainer, deletedContainer } = getUiElement();
  const taskDoContainer = doContainer.querySelectorAll('div');
  const taskScheduleContainer = scheduleContainer.querySelectorAll('div');
  const taskDeletedContainer = scheduleContainer.querySelectorAll('div');

  checkForEmptyTask(taskDoContainer, doContainer);
  checkForEmptyTask(taskScheduleContainer, scheduleContainer);
  checkForEmptyTask(taskDeletedContainer, deletedContainer);
}

export function closeInputTaskForm(element) {
  element.classList.remove('opacity-100', 'translate-y-0');
  element.classList.add('opacity-0', 'translate-y-5');
  setTimeout(() => {
    element.style.display = 'none'; // Sembunyikan form setelah animasi
  }, 300);
}
