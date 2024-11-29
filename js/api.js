async function fetchData(endpoint) {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
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