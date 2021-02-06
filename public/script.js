/** @format */
'use strict';

const TaskList = function (container, callback) {
  this.template = document.querySelector(".template");
  this.tasks = [];
  this.order = -1;

  this.addTask = function (text, status) {
    let task = this.template.cloneNode(true);
    ++this.order;
    this.tasks.push({
      text: text,
      status: status,
    });
    task.addEventListener(
      "click",
      markAsDone.bind({
        element: task,
        tasks_object: this.tasks,
      })
    );
    task
      .querySelector(".option")
      .addEventListener(
        "click",
        toggleOptions.bind(task.querySelector(".options"))
      );
    task.querySelector(".remove").addEventListener(
      "click",
      remove.bind({
        element: task,
        tasks_object: this.tasks,
      })
    );
    task.querySelector(".edit").addEventListener("click", startEdit.bind(task));
    task
      .querySelector(".save")
      .addEventListener("click", saveChanges.bind({
        element: task,
        tasks_object: this.tasks,
      }));
    //window.addEventListener("click", toggleOptions.bind(false));
    task.classList.remove("template");
    if (status) {
      task.classList.add("done");
    }
    task.querySelector("pre").textContent = text;
    task.setAttribute("data-order", this.order);
    document.querySelector(container).append(task);
  };

  const markAsDone = function () {
    if (!this.element.classList.contains("editable")) {
      this.element.classList.toggle("done");

      let order = this.element.getAttribute("data-order");
      let status = this.element.classList.contains("done");
      this.tasks_object[order].status = status ? 1 : "";

      callback(this.tasks_object);
    }
  };

  const toggleOptions = function (event) {
    event.stopPropagation();
    let options = this;

    if (options === false) {
      options = document.querySelector(".options.active");
    }
    if (options) {
      options.classList.toggle("active");
    }
  };

  const remove = function (event) {
    event.stopPropagation();
    let order = this.element.getAttribute("data-order");
    this.tasks_object.splice(order, 1);
    this.element.remove();

    let all_tasks = document.querySelectorAll(".task-list>div");
    for (let i = 0; i < all_tasks.length; i++) {
      all_tasks[i].setAttribute("data-order", i - 1);
    }

    callback(this.tasks_object);
  };

  const startEdit = function (event) {
    event.stopPropagation();
    if (!this.classList.contains("done")) {
      this.querySelector("pre").setAttribute("contenteditable", true);
      this.classList.add("editable");
      this.querySelector(".options").classList.remove("active");
    }
  };

  const saveChanges = function (event) {
    event.stopPropagation();
    let order = this.element.getAttribute("data-order");
    this.tasks_object[order].text = this.element.querySelector('pre').textContent;

    this.element.classList.remove("editable");
    if (this.element.querySelector("pre").textContent === "") {
      this.element.remove();
    }
    this.element.querySelector("pre").removeAttribute("contenteditable");
    callback(this.tasks_object)
  };
};


function saveTask(task_list) {
  localStorage.setItem("tasks", JSON.stringify(task_list));

  $.ajax({
    method: 'post',
    url: action,
    data: {
      action: 'update',
      todos: task_list
    }
  }).done(function (msg) {
    console.log(msg);
  });
}
let todo = new TaskList(".task-list", saveTask);

document
  .querySelector(".new-task")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let textarea = this.querySelector("textarea");
    if (textarea.value !== "") {
      todo.addTask(textarea.value, '');
      saveTask(todo.tasks);
    }
    textarea.value = "";
  });

localStorage.setItem("tasks", "");

let listen = setInterval(function () {
  $.ajax({
    method: 'get',
    url: action,
    data: {
      action: 'get'
    }
  }).done(function (result) {
    if (result.status === "success") {
      let data = localStorage.getItem("tasks");
      if (data !== result.data) {
        localStorage.setItem("tasks", result.data);
        let tasks = JSON.parse(result.data);
        if (!tasks) {
          tasks = [];
        }


        todo = new TaskList(".task-list", saveTask);
        let task_list = document.querySelector(".task-list");

        let todo_elements = task_list.querySelectorAll('[data-order]');

        for (let i = 0; i < todo_elements.length; i++) {
          if (!todo_elements[i].classList.contains('editable')) {
            todo_elements[i].remove();
          }
        }


        for (let i = 0; i < tasks.length; i++) {
          if (todo_elements[i] === undefined || !todo_elements[i].classList.contains('editable')) {
            todo.addTask(tasks[i].text, tasks[i].status);
          }
          else {
            document.querySelector(".task-list")
              .append(document.querySelector('.editable'));
            todo.order++;
          }
        }
      }
    }
  });
}, 1000);