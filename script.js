(function () {
  "use strict";

  var STORAGE_KEY = "studyflow-tasks";
  var MAX_TASK_LENGTH = 200;
  var INVISIBLE_CHARS_REGEX = /[\s\x00-\x1F\x7F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;
  var TASK_ID_REGEX = /^[A-Za-z0-9_-]+$/;

  var taskForm = document.getElementById("task-form");
  var taskInput = document.getElementById("task-input");
  var formError = document.getElementById("form-error");
  var storageError = document.getElementById("storage-error");
  var taskList = document.getElementById("task-list");
  var emptyState = document.getElementById("empty-state");
  var taskCount = document.getElementById("task-count");
  var statusRegion = document.getElementById("status");

  var tasks = loadTasks();

  taskInput.addEventListener("input", function () {
    if (!formError.hidden) {
      hideFormError();
    }
  });

  taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTask(taskInput.value);
  });

  renderTasks();

  function loadTasks() {
    try {
      var rawValue = localStorage.getItem(STORAGE_KEY);

      if (rawValue === null) {
        return [];
      }

      var parsedValue = JSON.parse(rawValue);

      if (!Array.isArray(parsedValue)) {
        saveTasks([]);
        return [];
      }

      var validTasks = parsedValue.filter(isValidTask);
      var sanitizedTasks = [];
      var seenIds = Object.create(null);
      var hasModified = false;

      for (var index = 0; index < validTasks.length; index += 1) {
        var currentTask = validTasks[index];
        var isDuplicate = Boolean(seenIds[currentTask.id]);
        var isSafeId = isValidTaskId(currentTask.id);
        var finalId = currentTask.id;

        if (isDuplicate || !isSafeId) {
          hasModified = true;
          finalId = createTaskId();
        }

        seenIds[finalId] = true;

        if (Object.keys(currentTask).length !== 3) {
          hasModified = true;
        }

        sanitizedTasks.push({
          id: finalId,
          text: currentTask.text,
          completed: Boolean(currentTask.completed)
        });
      }

      if (validTasks.length !== parsedValue.length || hasModified) {
        saveTasks(sanitizedTasks);
      }

      return sanitizedTasks;
    } catch (error) {
      showStorageError(
        "Storage error: Browser storage cannot be accessed. Tasks will not be saved after you close this page."
      );
      return [];
    }
  }

  function saveTasks(nextTasks) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
      hideStorageError();
      return true;
    } catch (error) {
      showStorageError(
        "Storage error: Your tasks are visible on screen, but could not be saved to this browser. Refreshing will lose recent changes."
      );
      return false;
    }
  }

  function hasVisibleContent(text) {
    return (
      typeof text === "string" &&
      text.replace(INVISIBLE_CHARS_REGEX, "").length > 0
    );
  }

  function isValidTaskId(id) {
    return (
      typeof id === "string" &&
      id.length > 0 &&
      id.length <= 100 &&
      TASK_ID_REGEX.test(id)
    );
  }

  function isValidTask(task) {
    return (
      task !== null &&
      typeof task === "object" &&
      typeof task.id === "string" &&
      task.id.length > 0 &&
      typeof task.text === "string" &&
      hasVisibleContent(task.text) &&
      task.text.length <= MAX_TASK_LENGTH &&
      typeof task.completed === "boolean"
    );
  }

  function addTask(rawText) {
    var text = rawText.replace(/[\x00-\x1F\x7F]/g, "").trim();

    if (!hasVisibleContent(text)) {
      showFormError("Please enter a task before adding it.");
      taskInput.focus();
      return;
    }

    if (text.length > MAX_TASK_LENGTH) {
      showFormError("Please keep tasks to 200 characters or fewer.");
      taskInput.focus();
      return;
    }

    hideFormError();

    tasks.push({
      id: createTaskId(),
      text: text,
      completed: false
    });

    var isSaved = saveTasks(tasks);
    renderTasks();
    taskForm.reset();
    taskInput.focus();
    if (isSaved) {
      announce("Task added.");
    }
  }

  function toggleTask(taskId, isCompleted) {
    var index = findTaskIndex(taskId);

    if (index === -1) {
      return;
    }

    tasks[index].completed = isCompleted;
    var isSaved = saveTasks(tasks);
    renderTasks();
    if (isSaved) {
      announce(isCompleted ? "Task marked complete." : "Task marked active.");
    }
  }

  function deleteTask(taskId) {
    var index = findTaskIndex(taskId);

    if (index === -1) {
      return;
    }

    tasks.splice(index, 1);
    var isSaved = saveTasks(tasks);
    renderTasks();
    if (isSaved) {
      announce("Task deleted.");
    }

    if (tasks.length === 0) {
      taskInput.focus();
    } else {
      var nextIndex = Math.min(index, tasks.length - 1);
      var nextItem = taskList.children[nextIndex];
      if (nextItem) {
        var nextButton = nextItem.querySelector("button");
        if (nextButton) {
          nextButton.focus();
        }
      }
    }
  }

  function findTaskIndex(taskId) {
    for (var index = 0; index < tasks.length; index += 1) {
      if (tasks[index].id === taskId) {
        return index;
      }
    }

    return -1;
  }

  function renderTasks() {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    var hasTasks = tasks.length > 0;
    emptyState.hidden = hasTasks;
    taskList.hidden = !hasTasks;
    taskCount.textContent = hasTasks ? String(tasks.length) + " total" : "";

    var fragment = document.createDocumentFragment();

    for (var index = 0; index < tasks.length; index += 1) {
      fragment.appendChild(createTaskItem(tasks[index]));
    }

    taskList.appendChild(fragment);
  }

  function createTaskItem(task) {
    var item = document.createElement("li");
    item.className = "task-item";
    if (task.completed) {
      item.classList.add("is-complete");
    }

    var checkboxId = "task-" + task.id;
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      toggleTask(task.id, checkbox.checked);
    });

    var label = document.createElement("label");
    label.setAttribute("for", checkboxId);
    label.textContent = task.text;

    var deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button-danger";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete task: " + task.text);
    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(deleteButton);
    return item;
  }

  function createTaskId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }

    return "task-" + String(Date.now()) + "-" + String(Math.random()).slice(2);
  }

  function showFormError(message) {
    formError.hidden = false;
    formError.textContent = message;
    taskInput.setAttribute("aria-invalid", "true");
  }

  function hideFormError() {
    formError.hidden = true;
    formError.textContent = "";
    taskInput.removeAttribute("aria-invalid");
  }

  function showStorageError(message) {
    if (storageError) {
      storageError.hidden = false;
      storageError.textContent = message;
    }
    announce(message);
  }

  function hideStorageError() {
    if (storageError) {
      storageError.hidden = true;
      storageError.textContent = "";
    }
  }

  function announce(message) {
    statusRegion.textContent = message;
  }
})();
