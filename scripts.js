let toDoList = [
    {
        title: "Eintrag 1",
        done: false,
    },
    {
        title: "Eintrag 2",
        done: false,
    },
    {
        title: "Eintrag 3",
        done: false,
    },
    {
        title: "Eintrag 4",
        done: false,
    },
];

function renderList() {
    let listDiv = document.getElementById("list");
    listDiv.innerHTML = "";

    for (let i = 0; i < toDoList.length; i++) {
        let item = toDoList[i];

        let itemDiv = document.createElement("div");
        itemDiv.setAttribute(
            "class",
            "item " + (item.done == true ? "done" : "")
        );

        let titleDiv = document.createElement("div");
        titleDiv.append(document.createTextNode(item.title));
        titleDiv.setAttribute("class", "title");
        itemDiv.append(titleDiv);

        let buttonsDiv = document.createElement("div");
        buttonsDiv.setAttribute("class", "buttons");

        let markAsDoneButton = document.createElement("input");
        markAsDoneButton.setAttribute("type", "button");
        markAsDoneButton.setAttribute("value", "erledigt");
        markAsDoneButton.setAttribute("onclick", `markItemAsDone(${i})`);
        buttonsDiv.append(markAsDoneButton);

        let updateButton = document.createElement("input");
        updateButton.setAttribute("type", "button");
        updateButton.setAttribute("value", "bearbeiten");
        updateButton.setAttribute("onclick", `updateItem(${i})`);
        buttonsDiv.append(updateButton);

        let deleteButton = document.createElement("input");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("value", "entfernen");
        deleteButton.setAttribute("onclick", `deleteItem(${i})`);
        buttonsDiv.append(deleteButton);

        itemDiv.append(buttonsDiv);

        listDiv.append(itemDiv);
    }
}

function addItem() {
    let newTitle = prompt("Wie soll der neue Eintrag heißen?");
    if (newTitle != null) {
        let newItem = {
            title: newTitle,
            done: false,
        };
        toDoList.push(newItem);
        renderList();
        storeList();
    }
}

function markItemAsDone(index) {
    console.log("markItemAsDone BEFORE", toDoList[index]);
    toDoList[index].done = true;
    console.log("markItemAsDone AFTER", toDoList[index]);
    renderList();
    storeList();
}

function updateItem(index) {
    let newTitle = prompt(
        "Wie soll der neue Eintrag heißen?",
        toDoList[index].title
    );
    if (newTitle != null) {
        toDoList[index].title = newTitle;
        renderList();
        storeList();
    }
}

function deleteItem(index) {
    toDoList.splice(index, 1);
    renderList();
    storeList();
}

function storeList() {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

function loadList() {
    try {
        toDoList = JSON.parse(localStorage.getItem("toDoList"));
    } catch (e) {
        console.error(e);
    }
}