// Category
import generateId from './utils/generate_id.js';
import { getUiElement, hideCategoryForm } from './ui.js';

const categories = [
  {
    icon: '📃',
    id: 1633830000000,
    title: 'No List',
  },
  {
    icon: '👨',
    id: 1633830000002,
    title: 'Learn',
  },
];

function addCategory() {
  const { formCreateCategory, overlay } = getUiElement();
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
  renderCategories(categories);

  title.value = '';
  icon.value = '';
  hideCategoryForm(overlay, formCreateCategory);
}

function generateCategoryObject(id, title, icon) {
  return {
    id,
    title,
    icon,
  };
}

function renderCategories(categoryList = categories) {
  const categoriesContainer = document.getElementById('list-categories');

  categoriesContainer.innerText = '';

  for (const categoriesItem of categoryList) {
    const categoryElement = makeCategory(categoriesItem);
    categoriesContainer.append(categoryElement);
  }

  updateCategories(categoryList);
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

function updateCategories(categories) {
  const categoryContainer = document.getElementById('inputCategory');

  categoryContainer.innerText = '';

  for (const category of categories) {
    const categoryTitle = document.createElement('option');
    categoryTitle.value = category.title;
    categoryTitle.innerText = category.icon + ' ' + category.title;
    categoryContainer.append(categoryTitle);
  }
}

function checkEmptyCategories(categories) {
  const categoryContainer = document.getElementById('list-categories');

  if (categories.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.innerText = 'No category';
    emptyMessage.classList.add(
      'bg-slate-200',
      'p-1',
      'rounded-md',
      'text-sm',
      'mt-2'
    );
    categoryContainer.append(emptyMessage);
  } else {
    const emptyMessage = categoryContainer.querySelector('p');
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
}

export { addCategory, renderCategories, categories, checkEmptyCategories };
