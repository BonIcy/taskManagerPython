export async function fetchTasks(token) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/tasks", {
            method: "GET",
            headers: {
                Authorization: `${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch tasks.");
        }

        const tasks = await response.json();
        return tasks;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export function renderTasks(tasks, filter = "all") {
    const tasksContainer = document.getElementById("tasks-container");
    tasksContainer.innerHTML = ""; 

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.status == false;
        if (filter === "pending") return task.status == true;
        return true; 
    });

    if (filteredTasks.length === 0) {
        tasksContainer.innerHTML = `<p>No tasks to show.</p>`;
        return;
    }

    filteredTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Status: ${task.status ? "In Progress" : "Completed"}</p>
            <button class="update-task" data-id="${task.id}">Update Task</button>
            <button class="delete-task" data-id="${task.id}">Delete Task</button>
        `;
        tasksContainer.appendChild(taskElement);
    });
}
