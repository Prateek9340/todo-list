const searchInputElem = document.querySelector('#input_box')


const createTodoInput = document.querySelector("#create_todo");
const bottomForm = document.querySelector("#bottom_form");
const mid = document.querySelector("#mid");

const submitElem = document.querySelector('#submit');
const taskInputElem = document.querySelector('#task_input');
const createTodoContainerElem = document.querySelector('#create_todo_container');
const completeTodo = document.querySelector("#done")
const notCompleteTodo = document.querySelector('#not-done')
const allTodo = document.querySelector('#all')

let todoList = JSON.parse(localStorage.getItem("todos")) || [];

let editTodoIndex;
const EDIT_BTN_TEXT = 'Edit';
const SUBMIT_BTN_TEXT = 'Create';


const completeTodoFilter = () => {
    const filterTodoList = todoList.filter((todo) => {
        return todo.taskStatus === true;
    })
    renderTodoList(filterTodoList);

}
const notCompleteTodoFilter = () => {
    const filterTodoList = todoList.filter((todo) => {
        return todo.taskStatus === false;
    })
    renderTodoList(filterTodoList);

}
const deleteTodo = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    todoList.splice(elementIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todoList));
    renderTodoList(todoList);
};

const handleCheckbox = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    const currentElem = todoList[elementIndex];
    currentElem.taskStatus = !currentElem.taskStatus;
    localStorage.setItem("todos", JSON.stringify(todoList));
    renderTodoList(todoList);
};

const editTodo = (ID) => {
    const elementIndex = todoList.findIndex((todo) => todo.ID === ID);
    editTodoIndex = elementIndex;
    createTodoInput.value = todoList[elementIndex].task;
    submitElem.innerText = EDIT_BTN_TEXT;
};

const renderTodoList = (array) => {
    mid.innerHTML = "";

    array.forEach((todo) => {
        const clutter = `
        <div class="info">
            <input class="checkbox" type="checkbox" ${todo.taskStatus ? 'checked' : ''}>
            <div class="task_text">
                <p>${todo.task}</p>
            </div>
            <div class="buttons">
                <button class="edit-button"><i class="ri-pencil-fill"></i> </button>
                <button class="delete-button"><i class="ri-delete-bin-7-fill"></i> </button>
            </div>
        </div>`;
        mid.innerHTML += clutter;
    });

    const checkboxElem = document.querySelectorAll(".checkbox");
    checkboxElem.forEach((checkbox, index) => {
        checkbox.addEventListener("change", () => {
            handleCheckbox(array[index].ID);
        });
    });

    const editButtonElem = document.querySelectorAll('.edit-button');
    editButtonElem.forEach((editButton, index) => {
        editButton.addEventListener("click", () => {
            editTodo(array[index].ID);
        });
    });

    const deleteButton = document.querySelectorAll('.delete-button');
    deleteButton.forEach((deleteButton, index) => {
        deleteButton.addEventListener("click", () => {
            deleteTodo(array[index].ID);
        });
    });
};

bottomForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (submitElem.innerText === EDIT_BTN_TEXT) {
        todoList[editTodoIndex].task = createTodoInput.value;
        localStorage.setItem("todos", JSON.stringify(todoList));
        renderTodoList(todoList);
        submitElem.innerText = SUBMIT_BTN_TEXT;
        createTodoInput.value = "";
    } else {
        const todoItem = {
            task: createTodoInput.value,
            taskStatus: false,
            ID: Date.now()
        };
        todoList.push(todoItem);
        localStorage.setItem("todos", JSON.stringify(todoList));
        createTodoInput.value = "";
        renderTodoList(todoList);
    }
});
completeTodo.addEventListener("click", () => {
    completeTodoFilter()
})

notCompleteTodo.addEventListener("click", () => {
    notCompleteTodoFilter()
})
allTodo.addEventListener("click", () => {
    renderTodoList(todoList);
})

searchInputElem.addEventListener('input', (e) => {
    const searchInputValue = e.target.value.toLowerCase();
    const filterTodos = todoList.filter((todo) =>
        todo.task.toLowerCase().includes(searchInputValue)
    );
    renderTodoList(filterTodos);
});


renderTodoList(todoList);



