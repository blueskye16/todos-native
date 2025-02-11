import { getUiElement, sidebarHandler, displayCreateTaskForm, displayCreateCategoryForm, checkTaskContainer } from "./ui.js";
import { addCategory } from "./categories.js";
import { addTask, renderTasks } from "./tasks.js";

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
  const submitTask = document.getElementById('btn-submit-task');
  submitTask.addEventListener('click', (event) => {
    event.preventDefault();
    addTask();
  });
});

/* function getUiElement() {
  return {
    // UI
    sidebar: document.getElementById('sidebar'),
    btnBurger: document.getElementById('btnBurger'),
    doContainer: document.getElementById('do-container'),
    scheduleContainer: document.getElementById('schedule-container'),
  };
} */



// Category


// Task




// generate ID




document.addEventListener(RENDER_EVENT, function () {
  console.log(tasks);
  renderTasks();
});
