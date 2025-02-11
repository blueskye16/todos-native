
function wrapTailwindClasses(classString) {
  return classString
    .split(/\s+/) // Pisahkan berdasarkan spasi
    .map(cls => `'${cls}'`) // Tambahkan tanda ''
    .join(', '); // Gabungkan kembali dengan koma
}

// Contoh penggunaan
const tailwindClasses = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";
const formattedClasses = wrapTailwindClasses(tailwindClasses);

console.log(`${formattedClasses}`);
// console.log(`openButton.classList.add(${formattedClasses});`);
