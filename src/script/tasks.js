// Tasks
import generateId from "./utils/generate_id.js";
import { clearTaskInputs } from "./ui.js";

const tasks = [];

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

export { addTask, renderTasks };