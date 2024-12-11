const notes = document.querySelectorAll('.note');
const lists = document.querySelectorAll('.list');

let draggedNote = null;

notes.forEach(note => {
  note.addEventListener('dragstart', () => {
    draggedNote = note;
    setTimeout(() => note.style.display = 'none', 0);
  });

  note.addEventListener('dragend', () => {
    setTimeout(() => {
      draggedNote.style.display = 'block';
      draggedNote = null;
    }, 0);
  });
});

lists.forEach(list => {
  list.addEventListener('dragover', (e) => e.preventDefault());

  list.addEventListener('drop', () => {
    if (draggedNote) list.appendChild(draggedNote);
  });
});

const addTaskButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  deleteButton.classList.add('delete-task');
  deleteButton.addEventListener('click', () => li.remove());

  li.appendChild(deleteButton);
  taskList.appendChild(li);

  newTaskInput.value = '';
}
