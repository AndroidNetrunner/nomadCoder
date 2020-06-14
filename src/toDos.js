localStorage["PENDING"] = "";
localStorage["FINISHED"] = "";
const pending = [];
const finished = [];
let count = 0;
function saveWork(thing) {
  pending.push(thing);
  count += 1;
  localStorage["PENDING"] = JSON.stringify(pending);
}

function removeFromFinished(event, obj) {
  finished.splice(
    finished.findIndex(function(item) {
      return item === obj;
    }),
    1
  );
  localStorage["FINISHED"] = JSON.stringify(finished);
}

function removeFromPending(event, obj) {
  pending.splice(
    pending.findIndex(function(item) {
      return item === obj;
    }),
    1
  );
  localStorage["PENDING"] = JSON.stringify(pending);
}
function moveToPending(event, obj) {
  pending.push(obj);
  finished.splice(
    finished.findIndex(function(item) {
      return item === obj;
    }),
    1
  );
  localStorage["FINISHED"] = JSON.stringify(finished);
  localStorage["PENDING"] = JSON.stringify(pending);
  const toDo = document.createElement("li");
  toDo.innerHTML = obj.text;
  const del = document.createElement("button");
  const checked = document.createElement("button");
  del.className = "del";
  del.innerHTML = "X";
  toDo.append(" ");
  toDo.appendChild(del);
  checked.className = "checked";
  checked.innerHTML = "V";
  toDo.append(" ");
  toDo.appendChild(checked);
  checked.addEventListener("click", event => {
    moveToFinish(event, obj);
    jsPending.removeChild(toDo);
  });
  const jsPending = document.querySelector(".js-pending");
  jsPending.appendChild(toDo);
  del.addEventListener("click", e => {
    removeFromPending(e, obj);
    jsPending.removeChild(toDo);
  });
}

function moveToFinish(event, obj) {
  finished.push(obj);
  pending.splice(
    pending.findIndex(function(item) {
      return item === obj;
    }),
    1
  );
  localStorage["FINISHED"] = JSON.stringify(finished);
  localStorage["PENDING"] = JSON.stringify(pending);
  const jsFinished = document.querySelector(".js-finished");
  const moving = document.createElement("li");
  moving.innerHTML = obj.text;
  const del = document.createElement("button");
  const undo = document.createElement("button");
  del.className = "del";
  del.innerHTML = "X";
  moving.append(" ");
  moving.appendChild(del);
  undo.className = "undo";
  undo.innerHTML = "↺";
  moving.append(" ");
  moving.appendChild(undo);
  undo.addEventListener("click", event => {
    moveToPending(event, obj);
    jsFinished.removeChild(moving);
  });
  jsFinished.appendChild(moving);
  del.addEventListener("click", e => {
    removeFromFinished(e, obj);
    jsFinished.removeChild(moving);
  });
}

function addToDo(event) {
  const work = { id: count, text: works.value };
  saveWork(work);
  const toDo = document.createElement("li");
  toDo.innerHTML = work.text;
  const del = document.createElement("button");
  const checked = document.createElement("button");
  del.className = "del";
  del.innerHTML = "X";
  toDo.append(" ");
  toDo.appendChild(del);
  checked.className = "checked";
  checked.innerHTML = "V";
  toDo.append(" ");
  toDo.appendChild(checked);
  checked.addEventListener("click", event => {
    moveToFinish(event, work);
    jsPending.removeChild(toDo);
  });
  const jsPending = document.querySelector(".js-pending");
  jsPending.appendChild(toDo);
  works.value = "";
  del.addEventListener("click", e => {
    removeFromPending(e, work);
    jsPending.removeChild(toDo);
  });
  event.preventDefault();
}

const newWork = document.querySelector(".js-ToDo");
const works = document.querySelector(".js-toDo");
newWork.addEventListener("submit", addToDo);
