

let form = document.getElementById("form");
let Task_title = document.getElementById("Task_title");
let msg = document.getElementById("msg");
let Add = document.getElementById("Add");
let close = document.getElementById("close1");
let Tasks = document.getElementById("Tasks");
let Date_title = document.getElementById("Date_title");
console.log(Date_title);
let Description_title = document.getElementById("Description_title");
Add.addEventListener("click", () => {
  isformValid();
});

let isformValid = () => {
  if (Task_title.value === "") {
    msg.innerHTML = "Please fill";
  } else {
    DataValue();
    close.click(); //so that when we add succesfully then form gets closed
  }
};

//for no localStorage
// let Data = {};
// let DataValue = () => {
//   Data["title"] = Task_title.value;
//   Data["date"] = Date_title.value;
//   Data["description"] = Description_title.value;

  //for local storage
  let Data=[];
  let DataValue = () => {
      Data.push({
        title : Task_title.value,
        date: Date_title.value,
        description: Description_title.value
      })
      localStorage.setItem("data",JSON.stringify(Data))
  addTask();
};

let addTask = () => {
    Tasks.innerHTML="";
    Data.map((x,y)=>{
        return(Tasks.innerHTML += `<div id=${y} class="bg-blue-300 border-2 border-solid rounded-md border-blue-500 px-2 my-4 py-2 h-auto">
        <h1 class="font-semibold">${x.title}</h1>
        <span>${x.date}</span>
        <p>${x.description}</p>
        <button><i onClick=editTask(this) data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i></button>
        <button><i onClick="deleteTask(this);addTask()" class="fa-solid fa-trash mx-4"></i></button>
        </div>`)
    })
  
  clearForm();
};

let clearForm = () => {
  Task_title.value = "";
  Date_title.value = "";
  Description_title.value = "";
};
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  Data.splice(e.parentElement.parentElement.id,1)
  localStorage.setItem("data",JSON.stringify(Data))
};

let editTask = (e) => {
  let currTask = e.parentElement.parentElement;
  Task_title.value = currTask.children[0].innerHTML;
  Date_title.value = currTask.children[1].innerHTML;
  Description_title.value = currTask.children[2].innerHTML;
  deleteTask(e);
};

// when our page reload/refreshes
(()=>{
    Data=JSON.parse(localStorage.getItem("data"))|| [];
    addTask();
})()