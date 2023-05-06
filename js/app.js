const createTodoForm = document.querySelector('#create-todo');
const todoList = document.querySelector('#todo-list');

const baseUrl = 'http://todos.api.ngknn.ru/api';

const token = localStorage.getItem('token');

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
}

if (!token) {
    window.location = '/login.html';
}

const submitHandle = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const res = await postTodo(title);
    if (res){
        event.target.elements.title.value = '';
        renderTodos();
    }
}

const deleteTodo = async (id) => {
    const res = await fetch(`${baseUrl}/todos/${id}`, {
        headers,
        method: 'delete'
    })
    return res.ok;
}

const toggleCompleted = async (todo) => {
    const res = await fetch(`${baseUrl}/todos/${todo.id}`, {
        headers,
        method: 'put',
        body: JSON.stringify({
            title: todo.title,
            completed: !todo.completed
        })
    });
    return res.ok;
}

const createTodoElement = (todo) => {
    const todoElement = document.createElement('div');
    todoElement.className = "d-flex todo-item"
    const labelElement = document.createElement('label');
    labelElement.addEventListener('click', async () => {
        const res = await toggleCompleted(todo);
        if (res){
            renderTodos();
        } else {
            alert('Ошибка');
        }
    })
    labelElement.className = "form-switch";
    labelElement.innerHTML = `
        <input type="checkbox" ${todo.completed ?'checked' : ''}>
        <i class="form-icon"></i><span>${todo.title}</span>
    `;
    const buttonDelete = document.createElement('button');
    buttonDelete.className = "delete-button";
    buttonDelete.innerHTML = `<i class="icon icon-cross"></i>`;
    buttonDelete.addEventListener('click', async () => {
        const res = await deleteTodo(todo.id);
        if (res){
            renderTodos();
        } else {
            alert('Не удалось удалить задачу');
        }
    });
    todoElement.append(labelElement);
    todoElement.append(buttonDelete);
    return todoElement;
}

const renderTodos = async () => {
    const todos = await getTodos();
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.append(todoElement);
    });
}

const getTodos = async () => {
    const res = await fetch(`${baseUrl}/todos`, {
        headers,
    });
    const data = await res.json();
    return data.todos.data;
}

const postTodo = async (title) => {
    try {
        const res = await fetch(`${baseUrl}/todos`, {
            method: "post",
            headers,
            body: JSON.stringify({
                title
            })
        })
        const data = await res.json();
        return true;
    } catch (e){
        return false;
    }
}

createTodoForm.addEventListener('submit', submitHandle);

renderTodos();