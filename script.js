const taskInput = document.querySelector('.input');
const addBut = document.querySelector('.entry-field__add-but');
const tasks = document.querySelector('.tasks-flex');

!!localStorage.idCounter ? "" : localStorage.setItem("idCounter", 0);;

// TODO
// ! Сделать фильтр выполнено/невыполнено
// ! Возможность редактировать текст задачи
// ! Счётчик выполненных/невыполненных задач

function tasksRecovery() {
  if (localStorage.length > 1) {
    let regularRule = /task*/;
    for (let i = 0; i < localStorage.length; i++) {
      if (regularRule.test(localStorage.key(i))) {
        const task = JSON.parse(localStorage.getItem(localStorage.key(i)));
        console.log(task);
        addTask(task.checked, task.text, task.id, false);
      }
    }
  }
}

function lengthCheck(str) {

  if (str.toString().length > 0 && str.toString().length < 50) {
    return true
  } else {
    return false
  }

}

function butLogic() {
  addBut.addEventListener("click", () => {
      addTask(false, taskInput.value, localStorage.idCounter);
  })
}

function inputKeyAdding() {
  taskInput.addEventListener("keydown", el => {
    if (el.code == "Enter") {
      addTask(false, taskInput.value, localStorage.idCounter);
    }
  })
}

function addTask(checked, text, id, newTask = true) {
  if (lengthCheck(taskInput.value) || !newTask) {
  
    const taskInfo = {
      checked: checked,
      text: text,
      id: id
    }
  
    const task = document.createElement("div");
    task.className = 'task';
    task.setAttribute("data-id", taskInfo.id)
    task.innerHTML = `
            
              <div class="task-text-block">
                <input type="checkbox" name="" id="task${taskInfo.id}" class="checkbox" ${taskInfo.checked ? "checked" : ""}>
                <label for="task${taskInfo.id}"></label>
                <label for="task${taskInfo.id}">   
                  <p class="task__text">
                    ${taskInfo.text}
                  </p>
                </label>
              </div>
              <div class="task-edit-menu">
                <div class="task-edit-menu__edit">
                  <span class="far fa-edit"></span>
                </div>
                <div class="task-edit-menu__delete">
                  <span class="far fa-trash-alt"></span>
                </div>
              </div>
            
    `
    tasks.append(task);
  
    const taskInfoJson = JSON.stringify(taskInfo);
    localStorage.setItem("task" + taskInfo.id, taskInfoJson);
  
    if (newTask) {
      localStorage.idCounter++;
    }
    taskInput.value = '';


    //* task deletion processing
    function deleteTask() {
      const taskId = task.getAttribute("data-id");
      const storageTaskKey = "task" + taskId;

      localStorage.removeItem(storageTaskKey);
      task.remove();

      if (localStorage.length == 1) {
        localStorage.idCounter = 0;
      }
    }
    const delBut = task.childNodes[3].childNodes[3];
    delBut.addEventListener("click", () => {
      deleteTask();
    })

    //* task completing processing
    const completeCheckbox = task.childNodes[1].childNodes[1];
    completeCheckbox.addEventListener("change", () => {
      const taskId = task.getAttribute("data-id");
      const storageTaskKey = "task" + taskId;

      const thisTaskObject = JSON.parse(localStorage.getItem(storageTaskKey));
      thisTaskObject.checked = !thisTaskObject.checked;
      thisTaskObjectJson = JSON.stringify(thisTaskObject);
      localStorage.setItem(storageTaskKey, thisTaskObjectJson);
      // console.log(thisTaskObject);
    })
  }
}

function taskFilter() {
  
}

tasksRecovery();
butLogic();
inputKeyAdding();