
const notCompleted = document.querySelector(".notCompleted");
const completed = document.querySelector(".Completed");
const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const updatebtn = document.getElementById("update-btn");

const url = `http://localhost:3000/todos`;


let incomplates = "";
let complates = "";

const renderTodos = (todos) => {
  todos.forEach((element) => {
    if (element.status == "todo") {
      incomplates += `
            <li data-id = ${element.id}>
               <span id="task"> ${element.task} </span>
               <button id="check-task">Complete</button>
                <button id="delete-task">Delete</button>
                <button id="edit-task">Edit</button>
            </li>
            `;
      notCompleted.innerHTML = incomplates;
    } else {
      complates += `
            <li data-id = ${element.id}>
               ${element.task}
                <button id="delete-task">Delete</button>
            </li>
            `;
      completed.innerHTML = complates;
    }
  });
};

//   Create a new Task
submitBtn.addEventListener("click", () => {
  if(userInput.value != "" )
  {
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data));

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: userInput.value,
          status: "todo",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          const dataArr = [];
          dataArr.push(data);
          renderTodos(dataArr);
        });
  }
  else{
    alert('Task is not Null');

  }
 
});


updatebtn.addEventListener("click", (e) => {
  //let taskId = e.target.parentElement.dataset.id;
  // console.log(document.getElementById('task-id').value);
  // console.log(document.getElementById('user-input').value);

  e.preventDefault();
  let taskId = document.getElementById('task-id').value;
 console.log(taskId)
  fetch(`${url}/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: userInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderTodos(dataArr);
    });
});


// Read all todos
fetch(url)
  .then((response) => response.json())
  .then((data) => renderTodos(data));

  // Update a Task
notCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  let deletebtnClicked = e.target.id == "delete-task";
  let editbtnClicked = e.target.id == "edit-task";
  let complatebtnClicked = e.target.id == "check-task";
  

 // Delete a Task
  if (deletebtnClicked) {
    // console.log(e.target.parentElement.dataset.id);

    let taskId = e.target.parentElement.dataset.id;
    fetch(`${url}/${taskId}`, {
       method: "DELETE" 
    })
    .then(
      (response) => console.log('Delete')
    );
  }

  // Read a single Task
  if(editbtnClicked){
    // console.log(e.target.parentElement.dataset.id);

    let taskId = e.target.parentElement.dataset.id;

    fetch(`${url}/${taskId}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.task);
      // console.log(data.id);

      document.getElementById('task-id').value = data.id;
      document.getElementById('user-input').value = data.task;
      document.getElementById('submit-btn').style.display = "none";
      document.getElementById('update-btn').style.display = "block";
      
    }
    );
  }

  // Complate A Task
  if (complatebtnClicked) {
    // console.log(e.target.parentElement.dataset.id);
    // console.log(e.target.parentElement.querySelector('#task').innerHTML);

    let taskId = e.target.parentElement.dataset.id;
    fetch(`${url}/${taskId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: "complate",
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderTodos(dataArr);
    });
  };
});


completed.addEventListener("click", (e) => {
  e.preventDefault();
  let deletebtnClicked = e.target.id == "delete-task";
  // Delete a Task
  if (deletebtnClicked) {
    // console.log(e.target.parentElement.dataset.id);

    let taskId = e.target.parentElement.dataset.id;
    fetch(`${url}/${taskId}`, {
       method: "DELETE" 
    })
    .then(
      (response) => console.log("Delete Success" , response)
    );
  }
});


