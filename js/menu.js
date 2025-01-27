console.log('Стрипт отображения меню успешно загружен.');

// Получение адреса сервера из конфига. Неа
// const apiUrl = "http://localhost:8000";
// const apiUrl = "";

function getConfig() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", './config/env.json', true); // асинхронный запрос
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const responseObject = JSON.parse(xhr.responseText);
            const apiUrl = responseObject.apiUrl;
            console.log(apiUrl); 
            // Сохраняем url в локальное хранилище
            localStorage.setItem('apiUrl', apiUrl);
        } else {
            console.error('Error:', xhr.statusText); // обрабатываем ошибку
        }
    };
    xhr.onerror = function() {
        console.error('Request failed'); // обрабатываем ошибку сети
    };
    xhr.send();
}

getConfig();

// // Сохраняем url в локальное хранилище
// localStorage.setItem('apiUrl', apiUrl);

// Выведем список меню
async function showMenu() {
    document.addEventListener("DOMContentLoaded", async function () {
        const token = localStorage.getItem('token');

        // Определяем массив с элементами меню
        let menuItems = await getMenu(); // ждем результат getMenu()

        // console.log(menuItems);

        // Проверяем, получили ли мы данные
        if (menuItems && Array.isArray(menuItems) && menuItems.length > 0) {
            // Если данные есть, используем их
            console.log("Меню:", menuItems);
        } else {
            // Если нет, использовать базовое меню
            menuItems = [{ name: "Авторизация", url: "login.html" }];
            console.log("Нет данных, показываем базовое меню");
        }

        // Функция для загрузки и отображения меню
        loadMenu(menuItems); // передаем меню в loadMenu
    });    
}

async function getMenu() {
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');
    if (token) {
        try {    
            const response = await fetch(`${apiUrl}/menu`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            return await response.json(); // возвращаем JSON данные
        } catch (error) {
            console.error('Ошибка при получении меню:', error);
            return false; // возвращаем false в случае ошибки
        }

    }
}

// Функция для загрузки и отображения меню
function loadMenu(menuItems) {
    const menuList = document.getElementById('menu');
    menuList.innerHTML = ''; // Очистка текущего меню
    // console.log(menuItems);

    // Проходим по массиву и создаем элементы списка
    menuItems.forEach(item => {
        const li = document.createElement('li'); // Создаем элемент списка
        const a = document.createElement('a');    // Создаем ссылку
        a.textContent = item.name;               // Устанавливаем текст ссылки
        a.href = item.url;                       // Устанавливаем атрибут href
        li.appendChild(a);                        // Добавляем ссылку в элемент списка
        menuList.appendChild(li);                 // Добавляем элемент списка в меню
    });
}

showMenu();
