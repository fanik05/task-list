// Define UI element
const form = document.getElementById("task_form");
const taskList = document.getElementById("tasks");
const clearBtn = document.getElementById("clear_task_btn");
const filter = document.getElementById("task_filter");
const taskInput = document.getElementById("new_task");

// Define event listeners
form.addEventListener("submit", addTask);
taskList.addEventListener("click", removeTask);
clearBtn.addEventListener("click", clearTask);
filter.addEventListener("keyup", filterTask);
document.addEventListener("DOMContentLoaded", getTasks);

// Define event functions
// Add Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a Task!");
    } else {
        // Create li element
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value + " "));
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerText = "x";
        li.appendChild(link);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = "";
    }

    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.remove();
            removeTasksFromLS(e.target.parentElement);
        }
    }
}

// Clear Task
function clearTask(e) {
    // taskList.innerHTML = "";

    // Faster performence
    while (taskList.firstChild) {
        taskList.firstChild.remove();
    }

    localStorage.clear();
}

// Filter Task
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll("li").forEach(task => {
        const item = task.firstChild.textContent;
        
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

// Store in local Storage
function storeTaskInLocalStorage(task) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasks(e) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(task + " "));
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        link.innerText = "x";
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function removeTasksFromLS(taskItem) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    taskItem.removeChild(taskItem.lastChild);
    tasks.forEach((task, index) => {
        if (taskItem.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}