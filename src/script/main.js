import {
  sidebarHandler,
  displayCreateTaskForm,
  displayCreateCategoryForm,
  checkTaskContainer,
} from './ui.js';
import {
  addCategory,
  categories,
  renderCategories,
  checkEmptyCategories,
} from './categories.js';
import { addTask, renderTasks, RENDER_EVENT } from './tasks.js';

document.addEventListener('DOMContentLoaded', function () {
  sidebarHandler();
  displayCreateTaskForm();
  displayCreateCategoryForm();

  checkTaskContainer();

  renderCategories(categories);
  checkEmptyCategories(categories);
  // checkTaskContainer();

  // Tambahkan opsi ke elemen <select> inputCategory
  const inputCategory = document.getElementById('inputCategory');
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.title;
    option.innerText = `${category.icon} ${category.title}`;
    inputCategory.appendChild(option);
  });

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

  document.addEventListener(RENDER_EVENT, checkTaskContainer);
  document.dispatchEvent(new Event(RENDER_EVENT));
});
