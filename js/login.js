console.log('Стрипт странички аутенфикации успешно загружен.');


async function login() {
    const username = document.getElementById('login').value;
    console.log(username)
    const password = document.getElementById('psw').value;
    console.log(password)

    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            username: username,
            password: password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        // Получаем токен и сохраняем его в локальное хранилище
        localStorage.setItem('token', data.access_token);
        console.log(data.access_token)
        document.getElementById('result').innerText = 'Авторизация прошла успешно!';
        await getUserInfo(data.access_token);
    } else {
        const errorData = await response.json();
        document.getElementById('result').innerText = errorData.detail;
    }

    window.location.href = "profile.html";
    // location.reload()
}

async function getUserInfo(token) {
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

    const response = await fetch(`${apiUrl}/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const userData = await response.json();
        document.getElementById('result').innerText += `\nПользователь: ${userData.username}, Роль: ${userData.role}`;

        console.log(userData.username)
    }
}

// location.reload()
