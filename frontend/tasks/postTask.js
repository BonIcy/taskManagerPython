export function createTask() {
    const createTaskModal = document.getElementById("task-modal");
    createTaskModal.classList.remove("hidden");

    const closeModalButton = document.getElementById("close-modal");
    closeModalButton.addEventListener("click", () => createTaskModal.classList.add("hidden"));

    createTaskModal.addEventListener("click", (e) => {
        if (e.target === createTaskModal) {
            createTaskModal.classList.add("hidden");
        }
    });

    const createTaskForm = document.getElementById("task-form");
    createTaskForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-description").value;
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify({ title, description })
            });

            if (!response.ok) {
                throw new Error("Failed to create task");
            }

            const newTask = await response.json();
            console.log("Task created successfully:", newTask);
            window.location.reload();
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task. Please try again.");
        }
    });
}
