export function exportTasks() {
    const exportTasksButton = document.getElementById("export-tasks");

    exportTasksButton.addEventListener("click", async () => {
        try {
            const fileName = "tasks_export.json";
            const token = localStorage.getItem("token");
            const response = await fetch(`http://127.0.0.1:8000/api/tasks/export?file_name=${fileName}`, {
                method: "POST",
                headers: {
                    "Authorization": `${token}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to export tasks.");
            }

            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();

            console.log("Tasks exported successfully!");
        } catch (error) {
            console.error("Error exporting tasks:", error);
            alert("Failed to export tasks. Please try again.");
        }
    });
}

export function importTasks() {
    const importTasksButton = document.getElementById("import-tasks");

    importTasksButton.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = ".json"; 
        fileInput.click();

        fileInput.addEventListener("change", async () => {
            const file = fileInput.files[0];

            if (!file) {
                alert("No file selected.");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("http://127.0.0.1:8000/api/tasks/import", {
                    method: "POST",
                    headers: {
                        "Authorization": `${token}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error("Failed to import tasks.");
                }

                const result = await response.json();
                alert(`${result.imported_count} tasks imported successfully!`);
                window.location.reload();
            } catch (error) {
                console.error("Error importing tasks:", error);
                alert("Failed to import tasks. Please try again.");
            }
        });
    });
}
