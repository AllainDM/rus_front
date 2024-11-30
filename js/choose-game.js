console.log('Стрипт странички выбора игры успешно загружен');



// Будущий список выбора игры
const chooseList = document.querySelector('.choose-list');
// Для присоединения к новой игре
const chooseNewGameList = document.querySelector('.choose-new-game');
// Для создания новой игры
const createNewGameList = document.querySelector('.create-new-game');

// Запрос статуса для отображения выбора одной из своих игр
async function requestStatusMyGames() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8000/my_games`, {
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
}

// Запрос статуса для отображения выбора новой игры
async function requestStatusForNewGame() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8000/all_active_games`, {
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
        console.error('Ошибка при получении меню:', error);
        // return false; // возвращаем false в случае ошибки
    }

    // Отдельно запросим список игроков для каждой игры

    // Определяем позицию кнопки и "создаем" соответсвующий приказ
    document.querySelectorAll(".btn-choose-game").forEach((btn, i) => {
        btn.addEventListener('click', () => {
            console.log(`тутутт`);
            console.log(`Вы выбрали игру номер: ${gamesList[i][0]}`);
            // console.log(`Вы выбрали игру номер: ${gamesList[i]}`);
            console.log(`Вы выбрали игру номер: ${i+1}`);
            setActiveGame(gamesList[i][0]); // Установить активную игру, ее данные будет отправлять бек при обновлении и загрузке новой страницы 
        });
    });
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
                <td>${item["players"].length}</td>
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
    try {
        const response = await fetch(`http://localhost:8000/add_player_to_game?game_id=${game_id}`, {
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

function setActiveGame(id){
    const req = new XMLHttpRequest();
    req.open("GET", `/set_active_game?id=${id}`);
    req.addEventListener('load', () => {
        console.log("Xmmm");
        window.location.href = 'game';
        // То что ниже в комментах оставим, интересно....
        // Если ответ есть, запустить функцию отображения
        // if (response) {
            // writeComment(response, id);
        // };
    });
    req.addEventListener('error', () => {
        console.log('error')
    });
    req.send();
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
        console.log("Запрос на создание новой настроенной игры");
        // alert(request.response);
        window.location.href = 'choose-game';
    });

};