export function deleteTask() {
    const tasksContainer = document.getElementById("tasks-container");

    tasksContainer.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-task")) {
            const taskId = e.target.getAttribute("data-id");
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to delete task.");
                }

                const result = await response.json();
                alert(result.detail);
                window.location.reload();
            } catch (error) {
                console.error("Error deleting task:", error);
                alert("Failed to delete task. Please try again.");
            }
        }
    });
}
