const todos = [];
const RENDER_EVENT = 'render-tasks';

document.addEventListener('DOMContentLoaded', function () {
  // Ambil elemen tombol dan form
  const showFormButton = document.getElementById('showFormButton');
  const taskForm = document.getElementById('taskForm');

  // Tampilkan form saat tombol diklik
  showFormButton.addEventListener('click', () => {
    // Toggle visibility form dengan animasi
    if (taskForm.classList.contains('opacity-0')) {
      taskForm.classList.remove('opacity-0', '-translate-y-5'); // Munculkan form
      taskForm.classList.add('opacity-100', 'translate-y-0');
    } else {
      taskForm.classList.remove('opacity-100', 'translate-y-0'); // Sembunyikan form
      taskForm.classList.add('opacity-0', '-translate-y-5');
    }
  });

  // Handle submit form
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;

    if (title && category) {
      alert(`Task berhasil disimpan!\nJudul: ${title}\nKategori: ${category}`);
      // Sembunyikan form setelah submit
      taskForm.classList.remove('opacity-100', 'translate-y-0');
      taskForm.classList.add('opacity-0', '-translate-y-5');
    } else {
      alert('Harap isi judul dan pilih kategori!');
    }
  });
});