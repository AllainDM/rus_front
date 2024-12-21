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
                console.log(`Вы выбрали провинцию номер: ${provincesList[i]["id"]}`);
                // Тут апи выбора провинции.
                setProvince(provincesList[i]["id"]); // 
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
        console.log("Xmmm");
        // window.location.href = 'game.html';
        
    } catch (error) {
        console.error('Ошибка при входе в игру:', error);
    }
};
