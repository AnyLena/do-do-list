const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const deleteBtn = document.querySelectorAll(".deleteButton");
const editButton = document.querySelectorAll(".editButton");


// ADDING A NEW TASK 

function addTask() {
   if (inputBox.value === ''){
    alert("You must write something!")
   }
   else {
    let li= document.createElement("li");
    li.innerHTML = `<p>${inputBox.value}</p>`;
    listContainer.appendChild(li);

    let pen = document.createElement("button");
    pen.innerHTML ="edit";
    pen.classList.add("editButton");
    pen.addEventListener("click", editTask);
    li.appendChild(pen);

    let btn = document.createElement("button");
    btn.innerHTML = "X";
    btn.classList.add("deleteButton")
    li.appendChild(btn);
    btn.addEventListener("click", deleteTask);
    addDeleteEventListeners();
    addEditEventListeners();
    saveData();
  }
  inputBox.value = "";
}


// FUNCTIONS FOR ADDING EVENT LISTENERS TO BUTTONS
// FUNCTIONS FOR ADDING DELETE-BUTTONS

function addDeleteEventListeners() {
  let deleteButtons = document.querySelectorAll('.deleteButton');
  deleteButtons.forEach(button => {
    button.addEventListener('click', deleteTask);
  });
}

function addEditEventListeners() {
  let editButtons = document.querySelectorAll('.editButton');
  editButtons.forEach(button => {
    button.addEventListener('click', editTask);
  });
}

function addDeleteButtonsToListItems() {
  let listItems = document.querySelectorAll('#list-container li');
  listItems.forEach(item => {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';
    item.appendChild(deleteButton);
  });
}

// PULLING DATA FROM LOCAL STORAGE ONLOAD AND DISPLAYING IN TO-DO-LIST

window.onload = function() {
  let savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  // addDeleteButtonsToListItems();
  addDeleteEventListeners();
  addEditEventListeners();
}

//STRIKE THROUGH TASKS MAKRED AS DONE

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI" || e.target.tagName === "P") {
    let targetElement = e.target.tagName === "P" ? e.target.parentElement : e.target;
    targetElement.classList.toggle("checked");
    saveData();
  }
    else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  }, false);

  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
  }
  showTasks()

  const removeitem = function () {
    localStorage.removeItem("data");
    listContainer.innerHTML = "";
  }

  const deleteTask = (e) => {
    e.target.parentElement.remove();
    saveData();
  }
  showTasks()
  
  const clearAll = function () {
    localStorage.clear();
    listContainer.innerHTML = "";
  }

  // ADDING EDIT TASK FUNCTIONALITY 

  const editTask = (e) => {

    let item = '';
    if (e.target.parentNode.querySelector('p')) {
    item = e.target.parentNode.querySelector('p').innerHTML;
    }

    let editInput = document.createElement("input");
    editInput.type ="text";
    editInput.value = item;
    editInput.classList.add("edit");

    e.target.innerHTML = "save"

    editInput.addEventListener("keypress", saveItem) 
    e.target.removeEventListener("click", editTask);
    e.target.addEventListener("click", saveItem);

    let pTags = e.target.parentNode.querySelectorAll('p');
    pTags.forEach(p => e.target.parentNode.removeChild(p));
  
    
    e.target.parentNode.prepend(editInput);
  
    editInput.select();
  }
  
  const saveItem = (e) => { 

    let inputValue = e.target.value;

    if (inputValue.length > 0 && e.keyCode === 13) {

      let p = document.createElement ('p');
      p.innerHTML = inputValue;
      e.target.parentNode.prepend(p);
      e.target.parentNode.removeChild(e.target);

      let editButton = document.querySelectorAll('.editButton');
      editButton.forEach( (button) => button.innerHTML = "edit")
      editButton.forEach( (button) => button.removeEventListener("click", saveItem))
      editButton.forEach( (button) => button.addEventListener("click", editTask))
      saveData();
    }

    if (e.type === 'click') {
      let inputField = document.querySelector('input.edit');
      let inputValue = inputField ? inputField.value : '';
    
      let p = document.createElement ('p');
      p.innerHTML = inputValue;
    
      let button = e.target.parentNode.querySelector('.editButton');
      e.target.parentNode.insertBefore(p, button);
    
      if (inputField) {
        inputField.parentNode.removeChild(inputField);
      }

      let editButton = document.querySelectorAll('.editButton');
      editButton.forEach( (button) => button.innerHTML = "edit")
      editButton.forEach( (button) => button.removeEventListener("click", saveItem))
      editButton.forEach( (button) => button.addEventListener("click", editTask))


      saveData();
    }
  }