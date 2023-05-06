const loginForm = document.querySelector("#login");
const baseUrl = 'http://todos.api.ngknn.ru/api';

const submitHandle = async (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const token = await fetchGetToken(name);
    localStorage.setItem('token', token);
    window.location = '/';
}

const fetchGetToken = async (name) => {
    try {
        const res = await fetch(`${baseUrl}/token`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: name
            })
        })
        const data = await res.json();
        return data.token;
    } catch (e){
        // Обработка ошибок
    }
}

loginForm.addEventListener('submit', submitHandle);