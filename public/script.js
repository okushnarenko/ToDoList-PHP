/** @format */
'use strict';

const TaskList = function (container, callback) {
  this.template = document.querySelector(".template");
  this.tasks = [];
  let order = -1;

  this.addTask = function (text, status) {
    let task = this.template.cloneNode(true);
    ++order;
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
    task.setAttribute("data-order", order);
    document.querySelector(container).append(task);

    callback(this.tasks);
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
      console.log(options);
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

let todo = new TaskList(".task-list", function (task_list) {
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

});

document
  .querySelector(".new-task")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let textarea = this.querySelector("textarea");
    if (textarea.value !== "") {
      todo.addTask(textarea.value, '');
    }
    textarea.value = "";
  });


$.ajax({
  method: 'post',
  url: action,
  data: {
    action: 'get'
  }
}).done(function (result) {

  if (result.status === "success") {
    let tasks = JSON.parse(result.data);

    if (!tasks) {
      tasks = {};
    }
    
    for (let i = 0; i < tasks.length; i++) {
      todo.addTask(tasks[i].text, tasks[i].status);
    }
  }
});