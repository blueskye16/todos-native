import { sidebarHandler, displayCreateTaskForm, displayCreateCategoryForm, checkTaskContainer } from "./ui.js";
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

document.addEventListener(RENDER_EVENT, function () {
  console.log(tasks);
  renderTasks();
});
