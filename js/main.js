import { getCookie, setCookie, deleteCookie } from "./helpers.js"

document.addEventListener("DOMContentLoaded", initTodoList)

function initTodoList() {
  const taskContainer = document.querySelector(".task-container")
  const formElement = document.querySelector("#new-task-form")
  const mainInput = document.querySelector("#new-task")
  let tasks = getCookie() || []

  tasks.forEach((task) => {
    if (task.name) {
      createTask(task, taskContainer)
    }
  })

  formElement &&
    formElement.addEventListener("submit", (e) => {
      e.preventDefault()

      const inputValue = mainInput.value
      if (!inputValue) return

      const newTask = {
        id: new Date().getTime(),
        name: inputValue,
      }

      tasks.push(newTask)
      createTask(newTask, taskContainer)
      setCookie(tasks)

      formElement.reset()
      mainInput.focus()
    })

  if (taskContainer) {
    taskContainer.addEventListener("click", (e) => {
      if (e.target.closest(".btn__remove")) {
        const taskId = e.target.closest(".task").id

        removeTask(tasks, taskId)
      }

      if (e.target.closest(".btn__edit")) {
        const input = e.target.closest(".btn__edit").previousElementSibling
        const taskId = e.target.closest(".task").id

        updateTask(tasks, taskId, input)
      }
    })

    taskContainer.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        const input = e.target
        const taskId = e.target.closest(".task").id

        updateTask(tasks, taskId, input)
      }
    })
  }

  document
    .querySelector(".clear-items")
    .addEventListener("click", () => clearAll(tasks, taskContainer))
}

function createTask(task, container) {
  const markup = `
          <div class="task" id="${task.id}">
              <input type="text" class="task__text" readonly value="${task.name}" />
              <button class="btn__edit">
                <ion-icon name="create-outline"></ion-icon>
              </button>
              <button class="btn__remove">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
          </div>
      `

  container.insertAdjacentHTML("afterbegin", markup)
}

function removeTask(taskArray, taskId) {
  taskArray = taskArray.filter((task) => task.id !== +taskId)

  deleteCookie(taskId)
  document.getElementById(taskId).remove()
}

function updateTask(taskArray, taskId, el) {
  if (el.hasAttribute("readonly")) {
    el.removeAttribute("readonly")
    el.setSelectionRange(el.value.length, el.value.length)
    el.focus()
  } else {
    el.setAttribute("readonly", true)
  }

  const task = taskArray.find((task) => task.id === +taskId)
  task.name = el.value
  setCookie(taskArray)
}

function clearAll(taskArray, container) {
  taskArray.forEach((entry) => deleteCookie(entry.id))
  taskArray = []
  container.textContent = ""
}
