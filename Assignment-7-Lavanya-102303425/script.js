const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskSummary = document.getElementById('taskSummary');

function updateSummary() {
  const total = taskList.children.length;
  const completed = document.querySelectorAll('.task.completed').length;
  taskSummary.textContent = `${total} task(s) | ${completed} completed`;
}

addTaskBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();

  if (!title || !desc) {
    alert('Please enter both title and description');
    return;
  }

  const taskDiv = document.createElement('div');
  taskDiv.className = 'task';

  let titleEl = document.createElement('div');
  titleEl.className = 'title';
  titleEl.textContent = title;

  let descEl = document.createElement('div');
  descEl.className = 'description';
  descEl.textContent = desc;

  const buttonsDiv = document.createElement('div');
  buttonsDiv.className = 'buttons';

  // Complete Button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Mark as Completed';
  completeBtn.className = 'complete';
  completeBtn.addEventListener('click', () => {
    taskDiv.classList.toggle('completed');
    completeBtn.textContent = taskDiv.classList.contains('completed')
      ? 'Mark as Incomplete'
      : 'Mark as Completed';
    updateSummary();
  });

  // Edit Button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.className = 'edit';
  editBtn.addEventListener('click', () => {
    if (editBtn.textContent === 'Edit') {
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = titleEl.textContent;
      titleInput.className = 'title-input';

      const descInput = document.createElement('textarea');
      descInput.value = descEl.textContent;
      descInput.className = 'desc-input';

      taskDiv.replaceChild(titleInput, titleEl);
      taskDiv.replaceChild(descInput, descEl);

      editBtn.textContent = 'Save';
      titleEl = titleInput;
      descEl = descInput;
    } else {
      const newTitle = titleEl.value.trim();
      const newDesc = descEl.value.trim();

      if (!newTitle || !newDesc) {
        alert('Both fields required!');
        return;
      }

      const updatedTitle = document.createElement('div');
      updatedTitle.className = 'title';
      updatedTitle.textContent = newTitle;

      const updatedDesc = document.createElement('div');
      updatedDesc.className = 'description';
      updatedDesc.textContent = newDesc;

      taskDiv.replaceChild(updatedTitle, titleEl);
      taskDiv.replaceChild(updatedDesc, descEl);

      editBtn.textContent = 'Edit';
      titleEl = updatedTitle;
      descEl = updatedDesc;
    }
  });

  // Delete Button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskDiv);
    updateSummary();
  });

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);

  taskDiv.appendChild(titleEl);
  taskDiv.appendChild(descEl);
  taskDiv.appendChild(buttonsDiv);

  taskList.appendChild(taskDiv);

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDesc').value = '';

  updateSummary();
});