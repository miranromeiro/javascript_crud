$(document).ready(() => {
    const fetchTasks = async () => {
      const response = await fetch('/tasks');
      const tasks = await response.json();
      renderTasks(tasks);
    };
  
    const renderTasks = (tasks) => {
      const taskList = $('#taskList');
      taskList.empty();
      tasks.forEach((task) => {
        const listItem = $(`
          <li class="list-group-item">
            <span>${task.name}</span>
            <div>
              <button class="btn btn-sm btn-warning edit-btn" data-id="${task.id}">Edit</button>
              <button class="btn btn-sm btn-danger delete-btn" data-id="${task.id}">Delete</button>
            </div>
          </li>
        `);
        taskList.append(listItem);
      });
    };
  
    $('#taskForm').on('submit', async (e) => {
      e.preventDefault();
      const taskName = $('#taskInput').val();
      await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName }),
      });
      $('#taskInput').val('');
      fetchTasks();
    });
  
    $('#taskList').on('click', '.delete-btn', async (e) => {
      const taskId = $(e.target).data('id');
      await fetch(`/tasks/${taskId}`, { method: 'DELETE' });
      fetchTasks();
    });
  
    $('#taskList').on('click', '.edit-btn', async (e) => {
      const taskId = $(e.target).data('id');
      const newName = prompt('Edit task name:');
      if (newName) {
        await fetch(`/tasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newName }),
        });
        fetchTasks();
      }
    });
  
    fetchTasks();
  });
  