// ==============================
// ACADEMIC PLANNER
// ==============================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

if (taskInput && addTaskBtn && taskList) {

    let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

    function saveTasks() {
        localStorage.setItem("academicTasks", JSON.stringify(tasks));
    }

    function addTask() {

        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks();

        taskInput.value = "";

        displayTasks();
    }

    function displayTasks() {

        taskList.innerHTML = "";

        tasks.forEach(function(task, index) {

            const li = document.createElement("li");

            const taskText = document.createElement("span");

            taskText.textContent = task.text;

            if (task.completed) {
                taskText.classList.add("completed");
            }

            const buttons = document.createElement("div");

            buttons.classList.add("task-buttons");

            const completeBtn = document.createElement("button");

            completeBtn.textContent = "Complete";
            completeBtn.classList.add("complete-btn");

            completeBtn.addEventListener("click", function() {

                tasks[index].completed = !tasks[index].completed;

                saveTasks();

                displayTasks();
            });

            const deleteBtn = document.createElement("button");

            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", function() {

                tasks.splice(index, 1);

                saveTasks();

                displayTasks();
            });

            buttons.appendChild(completeBtn);
            buttons.appendChild(deleteBtn);

            li.appendChild(taskText);
            li.appendChild(buttons);

            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            addTask();
        }

    });

    // Display saved tasks when the page opens
    displayTasks();
}
// ==============================
// CONTACT FORM VALIDATION
// ==============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const messageInput = document.getElementById("message");
        const successMessage = document.getElementById("successMessage");

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        // Check for empty fields
        if (!name || !email || !phone || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Check email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check phone number
        const phonePattern = /^[0-9]+$/;

        if (!phonePattern.test(phone)) {
            alert("Phone number must contain only digits.");
            return;
        }

        // Show success message
        successMessage.textContent =
            "Your message has been submitted successfully!";

        successMessage.style.color = "#C9A227";
        successMessage.style.fontWeight = "bold";
        successMessage.style.marginTop = "15px";

        // Clear the form
        contactForm.reset();

    });
}