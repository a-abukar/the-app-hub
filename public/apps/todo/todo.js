document.addEventListener('DOMContentLoaded', () => {
  const newTaskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const tasksList = document.getElementById('tasks');

  addTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
      const li = document.createElement('li');
      li.textContent = taskText;
      tasksList.appendChild(li);
      newTaskInput.value = '';
    }
  });

  newTaskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskButton.click();
    }
  });
});
