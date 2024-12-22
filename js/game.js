console.log('Стрипт странички игры успешно загружен');

/////////////////////////////////////////////
// Основное оглавление
/////////////////////////////////////////////
// Параметры игрока и партии
// Обработка вкладок
// Функции запроса и загрузки данных с сервера


/////////////////////////////////////////////
/////////////////////////////////////////////



/////////////////////////////////////////////
// Параметры игрока и партии
/////////////////////////////////////////////
// Параметры игрока
// Параметры партии
/////////////////////////////////////////////

// Параметры игрока
let statusDynasty = {
    dynasty_name: "",               // Название династии.
    player_name: "",
    gold: 0,                        // Казна игрока.
    win_points: 0,                  // Победные очки.

    body_points: 0,                 // Очки действия.
    authority: 0,                   // Авторитет.
    title: 0,                       // Титул.

    acts: [],                       // 
    result_logs_text: [],           // Логи за последний ход.
    result_logs_text_all_turns: [], // Логи за все ходы.
    end_turn: false,                // Подтверждение готовности хода.
    end_turn_know: true,            // Оповещение о новом ходе.

}

// Параметры партии
let statusGame = {
    game_id: "",        // ИД партии. Будем передавать вместе с ходом?

    // Параметры ходы
    year: 800,
    turn: 1,

    // Игроки
    // dynastyList: "",  // Пока не сохраняется корректно.
    cur_num_players: 0,
    max_players: 0,

    // Определение победителей
    winners: "",
    win_points_to_win: "",

    // Активность партии
    is_active: 1,
    the_end: 0,

    date_create: "",
}
/////////////////////////////////////////////
/////////////////////////////////////////////

/////////////////////////////////////////////
// Обработка вкладок
/////////////////////////////////////////////
// О партии
// Поселение
// Торговля
// Карта
// Династия
// Армия
// Игроки
/////////////////////////////////////////////

// Восстановление состояния при загрузке страницы
window.onload = function() {
    const lastOpenedTab = localStorage.getItem('last-opened-tab');
    if (lastOpenedTab) {
        // Если таб был сохранен, отображаем его
        document.getElementById(lastOpenedTab).click();
    } else {
        // Если ничего не сохранено, открываем первую вкладку по умолчанию
        document.getElementById('party-button').click();
    }
};

// О партии
document.getElementById('party-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("party-window").setAttribute('style','visibility:visible;');
    document.getElementById("party-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'visibility: visible');
    localStorage.setItem('last-opened-tab', 'party-button');
});
// Поселение
document.getElementById('settlement-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("settlement-window").setAttribute('style','visibility:visible');
    document.getElementById("settlement-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'visibility: visible');
    localStorage.setItem('last-opened-tab', 'settlement-button');
});
// Торговля
document.getElementById('trade-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("trade-window").setAttribute('style','visibility:visible');
    document.getElementById("trade-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'visibility: visible');
    localStorage.setItem('last-opened-tab', 'trade-button');
});
// Карта
document.getElementById('map-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("map-window").setAttribute('style','visibility:visible');
    document.getElementById("map-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'visibility: visible');
    localStorage.setItem('last-opened-tab', 'map-button');
});
// Династия
document.getElementById('dynasty-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("dynasty-window").setAttribute('style','visibility:visible');
    document.getElementById("dynasty-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'visibility: visible');
    localStorage.setItem('last-opened-tab', 'dynasty-button');
});
// Армия
document.getElementById('army-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("army-window").setAttribute('style','visibility:visible');
    document.getElementById("army-button").setAttribute('style','color:red; cursor: pointer;');
    // Дополнительно скроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'display: none');
    localStorage.setItem('last-opened-tab', 'army-button');
});
// Игроки
document.getElementById('players-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("players-window").setAttribute('style','visibility:visible');
    document.getElementById("players-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-province").setAttribute('style', 'visibility: visible');
    localStorage.setItem('last-opened-tab', 'players-button');
});
///////////////////////////////////////////////////
///////////////////////////////////////////////////


///////////////////////////////////////////////////
// Функции запроса и загрузки данных с сервера
///////////////////////////////////////////////////
// Запрос к серверу на получение данных об партии
// Запрос к серверу на получение данных об игроке

///////////////////////////////////////////////////

// Запрос к серверу на получение данных об партии
async function requestStatusGame() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8000/req_status_game', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        } else {           


            console.log("Запрос на полученние данных о партии.");
            let res = await response.json()
            console.log(res);
            actualVarGame(res);
            // location.reload();
        }

    } catch (error) {
        console.error('Ошибка при создании игровой сессии:', error);
    }
}

// Запрос к серверу на получение данных об игроке
async function requestStatusPlayer() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8000/req_status_game_player', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        } else {           


            console.log("Запрос на полученние данных об игроке.");
            let res = await response.json()
            console.log(res);
            actualVarPlayer(res);
            // location.reload();
        }

    } catch (error) {
        console.error('Ошибка при создании игровой сессии:', error);
    }
}

// Запрос к серверу на получение данных о провинциях
// Делается так же перед загрузкой этой странички. 
// Чтобы понять если ли у игрока территория с которой он играет.
// Если такой территории нет, игрок будет сначала переотправлен на страницу с выбором провинции.
async function requestStatusProvinces() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8000/get_player_provinces', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        } else {           


            console.log("Запрос на полученние данных об провинциях игрока.");
            let res = await response.json()             
            console.log(res);

            // Если у игрока нет провинций, переместим его на страницу выбора провинции.
            if (res.length < 1) {
                // Сделать модальное окошко?
                // Создается в окне выбора провинции?
                infoModal("Необходимо выбрать страну.", 30, 'choose-province.html', text_ok="Хорошо", text_no="Мне и так норм") // Второй аргумент размер шрифта основного текста
                // alert("У вас нет провинции")  // Тестовый алерт
                // window.location.href = 'choose-province.html';
            }

            // location.reload();
        }

    } catch (error) {
        console.error('Ошибка при создании игровой сессии:', error);
    }
}


{/* <div id="player_name">Имя игрока</div>
<div id="game-id">Номер игры</div>
<div id="game-date">Время создания</div>
<div id="cur-num-players">Игроков:</div>
<div id="max-players">Макс. игроков:</div>
<div id="victory-conditions">Условия победы: Набрать 666 очков</div>
<div id="winners">Победитель(и): не определен</div>
<div id="win-points">Победные очки:</div>  */}

// Основная функция обновления параметров на страничке
function updateVar() {
    document.getElementById('body_points').innerText = `Очки действия: ${statusDynasty.body_points - statusDynasty.acts.length}/${statusDynasty.body_points}`;
    // document.getElementById('body_points').innerText = 'Очки действия: ' + statusDynasty.body_points - statusDynasty.acts.length + "/" + statusDynasty.body_points;
    document.getElementById('dynasty_name').innerText = 'Династия: ' + statusDynasty.dynasty_name;    
    document.getElementById('gold').innerText = 'Казна: ' + statusDynasty.gold;    
    document.getElementById('title').innerText = 'Титул: ' + statusDynasty.title;

    document.getElementById('game-id').innerText = 'Номер игры: ' + statusGame.game_id; 
    document.getElementById('game-date').innerText = 'Дата создания: ' + statusGame.date_create; 
    document.getElementById('cur-num-players').innerText = 'Игроков: ' + statusGame.cur_num_players; 
    document.getElementById('max-players').innerText = 'Макс. игроков: ' + statusGame.max_players; 
    document.getElementById('victory-conditions').innerText = 'Условия победы: ' + statusGame.win_points_to_win; 
    document.getElementById('winners').innerText = 'Победитель: ' + statusGame.winner_id; 
    document.getElementById('win-points').innerText = 'Победные очки: ' + statusDynasty.win_points; 

    

}

// Функция обновления данных в statusDynasty
function actualVarPlayer(res) {
    statusDynasty.dynasty_name = res.name
    // statusDynasty.player_name = res.player_name
    statusDynasty.gold = res.gold
    // statusDynasty.win_points = res.win_points

    statusDynasty.body_points = res.body_points
    statusDynasty.authority = res.authority
    statusDynasty.title = res.title

    statusDynasty.acts = res.acts
    // statusDynasty.result_logs_text = res.result_logs_text
    // statusDynasty.result_logs_text_all_turns = res.result_logs_text_all_turns
    // statusDynasty.end_turn = res.end_turn
    // statusDynasty.end_turn_know = res.end_turn_know


    console.log('!!!!!!!! statusGameDictPlayer');
    console.log(statusDynasty);

    // Запрос для обвновления данных на страничке.
    // Выполним для каждой функции, ибо пока не решена проблема асинхронности.
    updateVar();

}

// Функция обновления данных в statusGame
function actualVarGame(res) {
    statusGame.game_id = res.row_id

    statusGame.year = res.year
    statusGame.turn = res.turn

    statusGame.cur_num_players = res.cur_num_players
    statusGame.max_players = res.max_players

    statusGame.winners = res.winner_id
    // statusGame.win_points_to_win = res.win_points_to_win

    statusGame.is_active = res.is_active
    statusGame.the_end = res.the_end

    statusGame.date_create = res.date_create

    console.log('!!!!!!!! statusGameDictGame');
    console.log(statusGame);

    // Запрос для обвновления данных на страничке.
    updateVar();
}

function updateAll() {

    requestStatusPlayer();
    requestStatusGame();
    requestStatusProvinces();
    // Запрос для обвновления данных на страничке.
    // Выполним для каждой функции, ибо пока не решена проблема асинхронности.
    updateVar();

}

updateAll()

///////////////////////////////////////////////
///////////////////////////////////////////////


///////////////////////////////////////////////
// Модалка
///////////////////////////////////////////////

// Модальное окно
// Получение самого элемента вверху скрипта
// // Получить модальное окно
const modal = document.getElementById("my-modal");

// // Получить кнопку, которая открывает модальное окно
// const btnShowAllLogsParty = document.getElementById("show_all_logs_party");

// // Получить элемент <span>, который закрывает модальное окно
const span = document.getElementsByClassName("close")[0];

// Открыть модальное окно по нажатию
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
function infoModal(text, text_size=20, href="", text_ok="Хорошо", text_no="Отмена") {
    modal.style.display = "block";
    let content = document.getElementById("show-content");
    content.innerHTML = `<div style="font-size: ${text_size}px">${text}</div>`

    if (href != "") {
        console.log("необходим переход 2")
        content.innerHTML += `<button onclick = "handleButtonClick('${href}')" style="font-size: 25px">${text_ok}</button>`
        content.innerHTML += `<button onclick = closeModal() style="font-size: 25px">${text_no}</button>`
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

function confimRecTurnModal() {
    modal.style.display = "block";
    let content = document.getElementById("show-content");
    content.innerHTML = `<div style="font-size: 25px">Новый ${statusGame.turn} ход</div>`;
    content.innerHTML += `<button onclick = confirmRecTurn() style="font-size: 25px; width: 150px">Отлично</button>`;
    // Сразу подвердим получени хода, чтобы окошко не выскакивало два раза
    statusGame.endTurnKnow = true;
}


