function newTaskToLocalStorage() {
    if (localStorage.length == 0)
    {
        localStorage.setItem("taskList", "");
//        alert('storage was empty');
    }

    if (localStorage.getItem("taskList").indexOf(document.task.taskname.value) === -1)
    {
        var newEntry = localStorage.getItem("taskList") + '/' + document.task.taskname.value;
        localStorage.setItem("taskList", newEntry);
        localStorage.setItem(document.task.taskname.value + '_description', document.task.taskdescription.value);
        localStorage.setItem(document.task.taskname.value + '_priority', document.task.priority.value);
        localStorage.setItem(document.task.taskname.value + '_marks', document.task.marks.value);
        localStorage.setItem(document.task.taskname.value + '_assigned', document.task.assigned.value);
        localStorage.setItem(document.task.taskname.value + '_type', document.task.type.value);
        localStorage.setItem(document.task.taskname.value + '_board', document.task.board.value);   
//        alert('entry added');     
    } 
    else 
    {
        alert('Dup entry, abort');
    }
}

function intoTheVoid(){
    localStorage.clear();
}

function moveToNextColumn() {
    var taskToMove = document.getElementById('id_coco');
    if (document.getElementById("done").contains(taskToMove))
    {
        document.getElementById("done").removeChild(taskToMove);
        alert('4');
    }
    if (document.getElementById("review").contains(taskToMove))
    {
        document.getElementById("review").removeChild(taskToMove);
        document.getElementById("done").appendChild(taskToMove);
        document.getElementById("nextcolumn").innerText = 'Remove';
        alert('3');
    }
    if (document.getElementById("inprogress").contains(taskToMove))
    {
        document.getElementById("inprogress").removeChild(taskToMove);
        document.getElementById("review").appendChild(taskToMove);
        alert('2');
    }
    if (document.getElementById("todo").contains(taskToMove))
    {
        document.getElementById("todo").removeChild(taskToMove);
        document.getElementById("inprogress").appendChild(taskToMove);
        alert('1');
    }
}

function loadTasksFromLocalStorage() {
    var taskPriorityLayout = document.createElement("div");
    taskPriorityLayout.className = "priority " + localStorage.getItem('coco_priority');
    taskPriorityLayout.id = "id_" + localStorage.getItem('coco');

    var taskLayout = document.createElement("div");
    taskLayout.className = "task";
    taskPriorityLayout.appendChild(taskLayout);

    var taskName = document.createElement("a");
    taskName.href = "settings.html";
    taskName.innerText = localStorage.getItem('coco');
    taskLayout.appendChild(taskName);

    var taskDescription = document.createElement("p");
    taskDescription.innerText = localStorage.getItem('coco_description');
    taskLayout.appendChild(taskDescription);

    var nextColumn = document.createElement("button");
    nextColumn.id = "nextcolumn";
    nextColumn.innerText = 'Next Stage';
    nextColumn.onclick = moveToNextColumn;
    taskLayout.appendChild(nextColumn);

    document.getElementById("todo").appendChild(taskPriorityLayout);
}

function showCover() {
    var coverDiv = document.createElement('div');
    coverDiv.id = 'cover-div';
    document.body.appendChild(coverDiv);
}

function hideCover() {
    document.body.removeChild(document.getElementById('cover-div'));
}

function showPrompt(text) {
    showCover();
    var form = document.getElementById('prompt-form');
    var container = document.getElementById('prompt-form-container');
    document.getElementById('prompt-message').innerHTML = text;
    form.elements.text.value = '';

    function complete(value) {
        hideCover();
        container.style.display = 'none';
        document.onkeydown = null;
        callback(value);
    }

    form.onsubmit = function() {
        var value = form.elements.text.value;
        if (value == '') return false;
        complete(value);
        return false;
    };

    form.elements.cancel.onclick = function() {
        complete(null);
    };

    document.onkeydown = function(e) {
        if (e.keyCode == 27) { // escape
            complete(null);
        }
    };

    var lastElem = form.elements[form.elements.length - 1];
    var firstElem = form.elements[0];

    lastElem.onkeydown = function(e) {
        if (e.keyCode == 9 && !e.shiftKey) {
            firstElem.focus();
            return false;
        }
    };

    firstElem.onkeydown = function(e) {
        if (e.keyCode == 9 && e.shiftKey) {
            lastElem.focus();
            return false;
        }
    };

    container.style.display = 'block';
    form.elements.text.focus();
}