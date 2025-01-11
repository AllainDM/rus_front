console.log('Стрипт странички выбора провинции для игрока успешно загружен');


// Будущий список выбора игры
const chooseList = document.querySelector('.choose-list');

// Запрос статуса для отображения выбора одной из своих игр
async function requestStatusProvinces() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8000/get_all_empty_provinces`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        games = await response.json()
        console.log(games);
        // console.log(response);
        chooseProvinces(games);
        // return await response.json(); // возвращаем JSON данные
    } catch (error) {
        console.error('Ошибка при получении меню:', error);
        // return false; // возвращаем false в случае ошибки
    }
}

requestStatusProvinces();

function chooseProvinces(provincesList) {
    // Добавим подсказку
    if (provincesList.length > 0) {
        console.log("Провинции есть");
        chooseList.innerHTML = `<span>Доступные провинции для игры:</span>`;  
    } else {
        chooseList.innerHTML = `<span>Нет доступных провинций</span>`;  
    };
    provincesList.forEach((item, id) => {
        chooseList.innerHTML +=         // 
        `<div class="standart-window" style="font-size: 16px;">
            <button style="margin: auto" class="btn btn-choose-game">Выбрать</button>
            Провинция: ${item.province_name}
        </div>`;  //   ид: ${id}
    });

    // Получаем все кнопки после добавления их в DOM
    const buttons = document.querySelectorAll('.btn-choose-game'); // Эти кнопки создаются выше в функции.
    buttons.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                console.log(`тутутт`);
                console.log(`Вы выбрали провинцию номер: ${provincesList[i]["row_id"]}`);
                // Тут апи выбора провинции.
                setProvince(provincesList[i]["row_id"]); // 
            });
        });
}

async function setProvince(id) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8000/set_province_to_players?province_id=${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log("Xmmm111");
        answer = await response.json()
        console.log(answer);
        infoModal(answer, 30, 'game.html')
        // window.location.href = 'game.html';

        
    } catch (error) {
        console.error('Ошибка при входе в игру:', error);
    }
};


// Модальное окно
// Получить модальное окно
const modal = document.getElementById("my-modal");

// Получить элемент <span>, который закрывает модальное окно
const span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
  modal.style.display = "none";
//   exitToMainMenuButtons(); // На всякий случай выйдем в главное меню кнопок
}

// Общая функция закрытия модального окна
function closeModal() {
    modal.style.display = "none";   
    // exitToMainMenuButtons(); // На всякий случай выйдем в главное меню кнопок
}

// Информационное модальное окошко
function infoModal(text, text_size=20, href="") {
    modal.style.display = "block";
    let content = document.getElementById("show-content");
    content.innerHTML = `<div style="font-size: ${text_size}px">${text}</div>`

    if (href != "") {
        console.log("необходим переход 2")
        content.innerHTML += `<button onclick = "handleButtonClick('${href}')" style="font-size: 25px">Хорошо</button>`
       
        // window.location.href = href;
    } else {
        content.innerHTML += `<button onclick = closeModal() style="font-size: 25px">Хорошо</button>`
    }
    // Опционально передаем адрес если нужен переход на другую страницу.

}

// Функция для обработки нажатия на кнопку для перехода на другую страницу
function handleButtonClick(href) {
    closeModal(); // Закрываем модальное окно
    window.location.href = href;
}

// Модальное окошко подтверждения
// Не получается пока сдать универсальное
function confimModal(text, fn) {
    fn = postTurn
    modal.style.display = "block";
    let content = document.getElementById("show-content");
    content.innerHTML = `<div style="font-size: 25px">${text}</div>`
    content.innerHTML += `<button onclick = ${fn} style="font-size: 25px; width: 100px">Да</button>`
    content.innerHTML += `<button onclick = closeModal() style="font-size: 25px; width: 100px">Нет</button>`

}
