import { fetchTasks, renderTasks } from './tasks/readTask.js';
import { createTask } from './tasks/postTask.js';
import { updateTask } from './tasks/updTask.js';
import { deleteTask } from './tasks/delTask.js';
import { exportTasks, importTasks } from './tasks/json.js';

if (!localStorage.getItem("token")) {
    window.location.href = "./user/login.html";
}

const token = localStorage.getItem("token");

const logoutButton = document.getElementById("logout-button");
const showAllButton = document.getElementById("show-all");
const showCompletedButton = document.getElementById("show-completed");
const showPendingButton = document.getElementById("show-pending");
const createTaskButton = document.getElementById("create-task");

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("You have been logged out.");
    window.location.href = "./user/login.html";
});
fetchTasks(token).then(tasks => renderTasks(tasks, "all"));
showAllButton.addEventListener("click", () => fetchTasks(token).then(tasks => renderTasks(tasks, "all")));
showCompletedButton.addEventListener("click", () => fetchTasks(token).then(tasks => renderTasks(tasks, "completed")));
showPendingButton.addEventListener("click", () => fetchTasks(token).then(tasks => renderTasks(tasks, "pending")));

createTaskButton.addEventListener("click", createTask);

const tasksContainer = document.getElementById("tasks-container");
deleteTask(tasksContainer);
updateTask(tasksContainer);

exportTasks();
importTasks();
fetchTasks(token).then(tasks => renderTasks(tasks, "all"));
