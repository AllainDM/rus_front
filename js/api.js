

// Получение адреса сервера из конфига.
async function getConfig() {
    const response = await fetch('./config/env.json');
    if (!response.ok) {
        throw new Error('Не удалось загрузить конфигурацию: ' + response.status);
    }
    return await response.json();
}
async function fetchData(endpoint) {
    const token = localStorage.getItem('token');
    const config = await getConfig(); // Получим конфигурацию
    const apiUrl = config.API_URL; // Извлечём URL из конфигурации

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