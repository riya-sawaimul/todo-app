const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

// Load saved tasks when the page opens
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

// Add task when button is clicked
addBtn.addEventListener("click", addTask);

// Add task when Enter is pressed
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}


// Display all tasks
function displayTasks() {

    taskList.innerHTML = "";

    const completedTasks=
    tasks.filter(function(task){
        return task.completed;
    }).length;
    const remainingTasks=tasks.length-completedTasks;
    taskCounter.textContent=
     tasks.length+" tasks, "+
     completedTasks + " completed, "+
     remainingTasks + "remaining";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        if (task.completed) {
            taskSpan.classList.add("completed");
        }

        // Mark task as completed
        taskSpan.addEventListener("click", function() {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();
            displayTasks();
        });


        // Delete button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();
        });


        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}


// Save tasks in browser
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}