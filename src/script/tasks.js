// Tasks
import generateId from './utils/generate_id.js';
import { closeInputTaskForm, getUiElement } from './ui.js';
import { categories } from './categories.js';

const RENDER_EVENT = 'render-tasks';

const tasks = [
  {
    id: 1633830000001,
    title: 'Learn JavaScript',
    category: 'Study',
    taskSection: 'task-do-section',
  },
  {
    id: 1633830000001,
    title: 'Learn Data Analyst',
    category: 'Learn',
    taskSection: 'task-schedule-section',
  },
];

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
  document.dispatchEvent(new Event(RENDER_EVENT));
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

  // Kosongkan container tanpa menghapus elemen <h2>
  const doHeader = doContainer.querySelector('h2');
  const scheduleHeader = scheduleContainer.querySelector('h2');

  doContainer.innerHTML = '';
  scheduleContainer.innerHTML = '';

  doContainer.appendChild(doHeader);
  scheduleContainer.appendChild(scheduleHeader);

  for (const taskItem of tasklist) {
    const taskElement = makeTask(taskItem);
    if (taskItem.taskSection == 'task-do-section') {
      doContainer.appendChild(taskElement);
    } else if (taskItem.taskSection == 'task-schedule-section') {
      scheduleContainer.appendChild(taskElement);
    } else {
      console.log('error: Invalid task section');
    }
    feather.replace();
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

  return taskContainer;
}

function clearTaskInputs() {
  const formContainer = document.getElementById('taskForm');
  document.getElementById('inputTitle').value = '';
  const inputCategory = document.getElementById('inputCategory');
  inputCategory.value = categories[0].icon + ' ' + categories[0].title;
  
  // document.getElementById('inputCategory').value = categories[0].icon + ' ' + categories[0].title;
  const taskSection = document.querySelectorAll(
    'input[name="input-task-section"]'
  );

  taskSection.forEach((radio) => (radio.checked = false));
  closeInputTaskForm(formContainer);
}

document.addEventListener(RENDER_EVENT, function () {
  console.log(tasks);
  renderTasks();
});

export { addTask, renderTasks, RENDER_EVENT };
