

async function fetchData(endpoint) {
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

    const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}