export function updateTask() {
    const tasksContainer = document.getElementById("tasks-container");
    const updateTaskModal = document.getElementById("update-task-modal");
    const updateTaskForm = document.getElementById("update-task-form");
    const closeUpdateModalButton = document.getElementById("close-update-modal");

    let currentTaskId = null;

    tasksContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("update-task")) {
            currentTaskId = e.target.getAttribute("data-id");
            const taskElement = e.target.parentElement;
            document.getElementById("update-task-title").value = taskElement.querySelector("h3").textContent;
            document.getElementById("update-task-description").value = taskElement.querySelector("p:nth-of-type(1)").textContent;
            const statusText = taskElement.querySelector("p:nth-of-type(2)").textContent;
            document.getElementById("update-task-status").value = statusText.includes("In Progress") ? "true" : "false";

            updateTaskModal.classList.remove("hidden");
        }
    });

    closeUpdateModalButton.addEventListener("click", () => {
        updateTaskModal.classList.add("hidden");
    });

    updateTaskModal.addEventListener("click", (e) => {
        if (e.target === updateTaskModal) {
            updateTaskModal.classList.add("hidden");
        }
    });

    updateTaskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("update-task-title").value;
        const description = document.getElementById("update-task-description").value;
        const status = document.getElementById("update-task-status").value;
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/${currentTaskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
                body: JSON.stringify({ title, description, status })
            });

            if (!response.ok) {
                throw new Error("Failed to update task.");
            }

            const updatedTask = await response.json();
            console.log("Task updated successfully:", updatedTask);
            window.location.reload();
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Failed to update task. Please try again.");
        }
    });
}
