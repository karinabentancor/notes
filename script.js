const notes = document.querySelectorAll('.note');
const lists = document.querySelectorAll('.list');

let draggedNote = null;

function addDragEvents(note) {
  note.addEventListener('dragstart', () => {
    draggedNote = note;
    setTimeout(() => note.style.display = 'none', 0);
  });

  note.addEventListener('dragend', () => {
    setTimeout(() => {
      note.style.display = 'block';
      draggedNote = null;
    }, 0);
  });
}

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

  const div = document.createElement('div');
  div.textContent = taskText;
  div.classList.add('note');
  div.draggable = true;
  addDragEvents(div);

  document.getElementById('todo').appendChild(div);
  newTaskInput.value = '';
}

// Initialize drag events for existing notes
notes.forEach(note => addDragEvents(note));