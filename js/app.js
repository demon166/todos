const createTodoForm = document.querySelector('#create-todo');
const baseUrl = 'http://todos.api.ngknn.ru/api';

const token = localStorage.getItem('token');

if (!token) {
    window.location = '/login.html';
}

const submitHandle = async (event) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    await fetchGetToken(title);
}

const fetchGetToken = async (title) => {
    try {
        const res = await fetch(`${baseUrl}/todos`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
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