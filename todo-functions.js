// Lay ra notes de dung
const getTodos = function () {
    const todoJSON = localStorage.getItem('todos');
    if (todoJSON !== null) {
        return JSON.parse(todoJSON);
    } else {
        return [];
    }
}

//Save note 
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Sap xep sort data 
const sortTodos = function (todos, sortBy) {
    if (sortBy === 'byEdited') {
        return todos.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byCreated') {
        return todos.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byAlphabet') {
        return todos.sort((a, b) => {
            if (a.text > b.text) {
                return 1;
            } else if (a.text < b.text) {
                return -1;
            } else {
                return 0;
            }
        })
    } else {
        return todos;
    }
}

//Ham renderTodos

const renderTodos = function (todos, filters) {
    todos = sortTodos(todos, filters.sortBy);
    const filterTodos = todos.filter(todo => {
        const searchText = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompleted = !todo.completed || !filters.hideCompleted;
        return searchText && hideCompleted;
    })

    generateSummary(todos);

    document.querySelector('#todo').textContent = '';

    filterTodos.forEach(todo => {
        document.querySelector('#todo').appendChild(generateDom(todo));
    })
}

//generateSummary
const generateSummary = function (todos) {

    const imcompleted = todos.filter(todo => {
        return !todo.completed
    })

    document.querySelector('#summary').textContent = `Bạn có ${imcompleted.length} task chưa hoàn thành`;
}

//removeTodo 
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(todo => {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

//changeCompletedTodo
const changeCompletedTodo = function (id) {
    const todo = todos.find(todo => {
        return todo.id === id;
    })

    if (todo !== undefined) {
        todo.completed = !todo.completed;
    }
}

//generateDOm
const generateDom = function (todo) {
    const todoEl = document.createElement('li');
    const checkbox = document.createElement('input');
    const textEl = document.createElement('a');
    const removeButton = document.createElement('button');
    const createdTime = document.createElement('small');
    const updatedTime = document.createElement('small');
    const breakEle = document.createElement('br');

    //cau hinh va them vao element cho tung element vua tao
    checkbox.setAttribute('type', 'checkbox');
    checkbox.classList.add('m-2');
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', function (e) {
        changeCompletedTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
    todoEl.appendChild(checkbox);

    textEl.setAttribute('href', `./edit.html#${todo.id}`);
    textEl.textContent = todo.text;
    todo.completed ? textEl.classList.add('text-success') : textEl.classList.add('text-danger');
    todoEl.appendChild(textEl);

    removeButton.classList.add('btn', 'border', 'py-0', 'px-2', 'ml-2', 'text-danger');
    removeButton.textContent = 'x';
    removeButton.addEventListener('click', function (e) {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
    todoEl.appendChild(removeButton);

    todoEl.appendChild(breakEle);

    createdTime.textContent = `Ngày tạo: ${generateCreatedAt(todo.createdAt)}`;
    todoEl.appendChild(createdTime);
    updatedTime.textContent = `Lần cập nhật cuối: ${generateLastUpdate(todo.updatedAt)}`;
    updatedTime.style.color = 'red';
    todoEl.appendChild(updatedTime);

    todoEl.classList.toggle('p-2');
    // todo.completed ? todoEl.classList.add('text-success') : todoEl.classList.add('text-danger');
    return todoEl;
}

//generateLastUpdated 

const generateLastUpdate = function (timestamps) {
    return moment(timestamps).fromNow();
}

//Ngay tao
const generateCreatedAt = function (timestamps) {
    return moment(timestamps).format('LLL');
}