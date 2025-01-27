console.log('Стрипт странички выбора игры успешно загружен');



// Будущий список выбора игры
const chooseList = document.querySelector('.choose-list');
// Для присоединения к новой игре
const chooseNewGameList = document.querySelector('.choose-new-game');
// Для создания новой игры
const createNewGameList = document.querySelector('.create-new-game');

// Получение адреса сервера из конфига.
async function getConfig() {
    const response = await fetch('./config/env.json');
    if (!response.ok) {
        throw new Error('Не удалось загрузить конфигурацию: ' + response.status);
    }
    return await response.json();
}

// Запрос статуса для отображения выбора одной из своих игр
async function requestStatusMyGames() {
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');
    try {

        const response = await fetch(`${apiUrl}/my_games`, {
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
        chooseGame(games);
        // return await response.json(); // возвращаем JSON данные
    } catch (error) {
        console.error('Ошибка при получении меню:', error);
        // return false; // возвращаем false в случае ошибки
    }
}

requestStatusMyGames();
// Функция выбора игры. 

function chooseGame(gamesList) {
    // Добавим подсказку
    if (gamesList.length > 0) {
        console.log("Игры есть");
        chooseList.innerHTML = `<span>Наши текущие игры:</span>`;  
    } else {
        chooseList.innerHTML = `<span>Нет доступных игр</span>`;  
    };
    gamesList.forEach((item, id) => {
        chooseList.innerHTML +=         // Игра номер: ${gamesList.game_id}   class="menu-btn menu-buttons-choose"
        `<div class="standart-window" style="font-size: 16px;">
            <button style="margin: auto" class="btn btn-choose-game">Войти</button>
            Игра № ${item.row_id}
        </div>`;  //   ид: ${id}
    });

    // Получаем все кнопки после добавления их в DOM
    const buttons = document.querySelectorAll('.btn-choose-game');
    buttons.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                console.log(`тутутт`);
                console.log(`Вы выбрали игру номер: ${gamesList[i]["row_id"]}`);
                setActiveGame(gamesList[i]["row_id"]); // Установить активную игру, ее данные будет отправлять бек при обновлении и загрузке новой страницы 
            });
        });
}

// Запрос статуса для отображения выбора новой игры
async function requestStatusForNewGame() {
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

    try {
        const response = await fetch(`${apiUrl}/all_active_games`, {
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
        chooseNewGame(games);
        // return await response.json(); // возвращаем JSON данные
    } catch (error) {
        console.error('Ошибка при получении списка игр:', error);
        // return false; // возвращаем false в случае ошибки
    }

    // Отдельно запросим список игроков для каждой игры

    // // Определяем позицию кнопки и "создаем" соответсвующий приказ
    // document.querySelectorAll(".btn-choose-game").forEach((btn, i) => {
    //     btn.addEventListener('click', () => {
    //         console.log(`тутутт`);
    //         console.log(`Вы выбрали игру номер: ${games[i]["row_id"]}`);
    //         // console.log(`Вы выбрали игру номер: ${gamesList[i]}`);
    //         console.log(`Вы выбрали игру номер: ${i+1}`);
    //         setActiveGame(gamesList[i]["row_id"]); // Установить активную игру, ее данные будет отправлять бек при обновлении и загрузке новой страницы 
    //     });
    // });
};

requestStatusForNewGame();


function chooseNewGame(gamesList) {
    chooseNewGameList.innerHTML = `<div>Список доступных игр:</div>`;  // Добавим подсказку
    chooseNewGameList.innerHTML += `
    <table class="table-new-games" style="margin-top: 10px" border="1">
        <tr>
            <td style="font-size: 18px; width: 45px;">№</td>
            <td style="font-size: 18px; width: 45px;">Год</td>
            <td style="font-size: 18px; width: 45px;">Ход</td>
            <td style="font-size: 16px;">Кол-во <br> игроков</td>
            <td rowspan=2 style="font-size: 16px">Макс.<br> игроков</td>
            <td style="font-size: 18px">Список игроков</td>
        </tr>
    </table>
    `;  // Добавим подсказку
    const tableNewGames = document.querySelector(".table-new-games");
    gamesList.forEach((item, id) => {
        console.log(`item ${item}`);

        // chooseList.innerHTML += `<div class="menu-btn menu-buttons-choose"><a href="{{url_for('game')}}">Игра номер: ${item}</a></div>`; 
        // <div class="menu-btn menu-buttons-choose">
        tableNewGames.innerHTML += `
            <tr class="main-background" style="font-size: 18px;">
                <td>${item["row_id"]}</td>
                <td>${item["year"]}</td>
                <td>${item["turn"]}</td>
                <td>${item["cur_num_players"]}</td>
                <td>${item["max_players"]}</td>
                <td>${item["players"]}</td>
                <td><button class="enter-new-game">Присоединиться</button></td>
            </tr>`;  //   ид: ${id}
    });

    // Определяем позицию кнопки и "создаем" соответсвующий приказ
    document.querySelectorAll(".enter-new-game").forEach((btn, i) => {
        btn.addEventListener('click', () => {
            console.log(`Вы выбрали игру номер: ${gamesList[i]["row_id"]}`);
            addPlayerToGame(gamesList[i]["row_id"]);
        });
    });
};

// Добавить игрока в запись в БД к выбранной игре
async function addPlayerToGame(game_id){
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');
    try {
        const response = await fetch(`${apiUrl}/add_player_to_game?game_id=${game_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        window.location.href = 'choose-game.html';
    } catch (error) {
        console.error('Ошибка при получении меню:', error);
        // return false; // возвращаем false в случае ошибки
    }
};

// При выборе игры, эта игра становится активной для бекенда и сразу идет перенаправление на страничку игры, скачивается "активная" игра с бека
async function setActiveGame(id){
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');
    try {
        const response = await fetch(`${apiUrl}/set_active_game?game_id=${id}`, {
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
        window.location.href = 'game.html';
        
    } catch (error) {
        console.error('Ошибка при входе в игру:', error);
    }
};

// Для создания новой игры
const inputMaxPlayers = document.getElementById('max-players');
const inputWinPoints = document.getElementById('win-points');
const bntMaxPlayersPlus = document.getElementById('max-players-plus');
const bntMaxPlayersMinus = document.getElementById('max-players-minus');
const bntWinPointsPlus = document.getElementById('win-points-plus');
const bntWinPointsMinus = document.getElementById('win-points-minus');
const btnCreateNewGame = document.getElementById('create-new-game');

bntMaxPlayersPlus.addEventListener('click', () => {
    num = Number(inputMaxPlayers.value);
    if (num < 8) {
        inputMaxPlayers.value = num + 1;
    };
});

bntMaxPlayersMinus.addEventListener('click', () => {
    num = Number(inputMaxPlayers.value);
    if (num > 1) {
        inputMaxPlayers.value = num - 1;
    };
});

bntWinPointsPlus.addEventListener('click', () => {
    num = Number(inputWinPoints.value);
    inputWinPoints.value = num + 1;
});

bntWinPointsMinus.addEventListener('click', () => {
    num = Number(inputWinPoints.value);
    if (num > 4) {
        inputWinPoints.value = num - 1;
    };
});

btnCreateNewGame.addEventListener('click', () => {
    let post = {
        maxPlayers: inputMaxPlayers.value,
        winPoints: inputWinPoints.value
    }
    createNewGame(post);
});

function createNewGame(post) {
    const request = new XMLHttpRequest();
    request.open('POST', '/create_new_game');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    
    console.log(JSON.stringify(post));
    request.send(JSON.stringify(post));

    request.addEventListener('load', () => {
        // console.log(request.response)
        console.log("Запрос на создание новой настроенной игры");
        // alert(request.response);
        // window.location.href = 'choose-game';
        location.reload();
    });

};

async function createNewGame(post) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8000/create_new_game', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        });

        console.log(JSON.stringify(post));
        
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        } else {           


            console.log("Запрос на создание новой настроенной игры.");
            let res = await response.json()
            console.log(res);
            location.reload();
        }

    } catch (error) {
        console.error('Ошибка при создании игровой сессии:', error);
    }
}


// Модальное окно
// Получение самого элемента вверху скрипта
// // Получить модальное окно
const modal = document.getElementById("my-modal");

// // Получить кнопку, которая открывает модальное окно
// const btnShowAllLogsParty = document.getElementById("show_all_logs_party");

// // Получить элемент <span>, который закрывает модальное окно
const span = document.getElementsByClassName("close")[0];

// // Открыть модальное окно по нажатию
// btnShowAllLogsParty.onclick = function() {
//     modal.style.display = "block";
//     let content = document.getElementById("show-content");
//     content.innerHTML = ""
//     console.log("Модалка открыта")
//     statusGame.allLogsParty.forEach((item, id) => {
//         console.log(item)
//         content.innerHTML += `<div>${item}</div>`
//     });
//     content.innerHTML += `<button onclick = closeModal() style="font-size: 20px">Выйти</button>`
// };

// btnShowAllLogsPartyPlayers.onclick = function() {
//     modal.style.display = "block";
//     let content = document.getElementById("show-content");
//     content.innerHTML = ""
//     console.log("Модалка открыта")
//     statusGame.logsTextAllTurns.forEach((item, id) => {
//         console.log(item)
//         content.innerHTML += `<div>${item}</div>`
//     });
//     content.innerHTML += `<button onclick = closeModal() style="font-size: 20px">Выйти</button>`
// };

// Когда пользователь нажимает на <span> (x), закройте модальное окно
span.onclick = function() {
  modal.style.display = "none";
  exitToMainMenuButtons(); // На всякий случай выйдем в главное меню кнопок
}

// Общая функция закрытия модального окна
function closeModal() {
    modal.style.display = "none";   
    // exitToMainMenuButtons(); // На всякий случай выйдем в главное меню кнопок
}

// Информационное модальное окошко
function infoModal(text, text_size=20) {
    modal.style.display = "block";
    let content = document.getElementById("show-content");
    content.innerHTML = `<div style="font-size: ${text_size}px">${text}</div>`
    content.innerHTML += `<button onclick = closeModal() style="font-size: 25px">Хорошо</button>`

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

function confimRecTurnModal() {
    modal.style.display = "block";
    let content = document.getElementById("show-content");
    content.innerHTML = `<div style="font-size: 25px">Новый ${statusGame.turn} ход</div>`;
    content.innerHTML += `<button onclick = confirmRecTurn() style="font-size: 25px; width: 150px">Отлично</button>`;
    // Сразу подвердим получени хода, чтобы окошко не выскакивало два раза
    statusGame.endTurnKnow = true;
}