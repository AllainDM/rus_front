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

    localStorage.setItem('last-opened-tab', 'party-button');
});
// Поселение
document.getElementById('settlement-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("settlement-window").setAttribute('style','visibility:visible');
    document.getElementById("settlement-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-user-province").setAttribute('style', 'visibility: visible');

    localStorage.setItem('last-opened-tab', 'settlement-button');
});
// Торговля
document.getElementById('trade-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("trade-window").setAttribute('style','visibility:visible');
    document.getElementById("trade-button").setAttribute('style','color:red; cursor: pointer;');

    localStorage.setItem('last-opened-tab', 'trade-button');
});
// Карта
document.getElementById('map-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("map-window").setAttribute('style','visibility:visible');
    document.getElementById("map-button").setAttribute('style','color:red; cursor: pointer;');
    // Откроем меню провинций
    document.getElementById("table-all-province").setAttribute('style', 'visibility: visible');

    localStorage.setItem('last-opened-tab', 'map-button');
});
// Династия
document.getElementById('dynasty-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("dynasty-window").setAttribute('style','visibility:visible');
    document.getElementById("dynasty-button").setAttribute('style','color:red; cursor: pointer;');

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

            // Если у игрока нет провинций, переместим его на страницу выбора провинции.
            if (res[1].length < 1) {
                // Сделать модальное окошко?
                // Создается в окне выбора провинции?
                infoModal("Необходимо выбрать страну.", 30, 'choose-province.html', text_ok="Хорошо", text_no="Мне и так норм") // Второй аргумент размер шрифта основного текста
                // alert("У вас нет провинции")  // Тестовый алерт
                // window.location.href = 'choose-province.html';
            } else {

                actualVarPlayer(res);
                // location.reload();
            }

        }

    } catch (error) {
        console.error('Ошибка при создании игровой сессии:', error);
    }
}

// !!!!!!!!! Передается с остальными данными игрока.
// Запрос к серверу на получение данных о провинциях
// Делается так же перед загрузкой этой странички. 
// Чтобы понять если ли у игрока территория с которой он играет.
// Если такой территории нет, игрок будет сначала переотправлен на страницу с выбором провинции.
// async function requestStatusProvinces() {
//     const token = localStorage.getItem('token');
//     try {
//         const response = await fetch('http://localhost:8000/get_player_provinces', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
//                 'Content-Type': 'application/json',
//             },
//         });
        
//         if (!response.ok) {
//             throw new Error('Сеть ответила с ошибкой: ' + response.status);
//         } else {           


//             console.log("Запрос на полученние данных об провинциях игрока.");
//             let res = await response.json()             
//             console.log(res);

//             // Если у игрока нет провинций, переместим его на страницу выбора провинции.
//             if (res.length < 1) {
//                 // Сделать модальное окошко?
//                 // Создается в окне выбора провинции?
//                 infoModal("Необходимо выбрать страну.", 30, 'choose-province.html', text_ok="Хорошо", text_no="Мне и так норм") // Второй аргумент размер шрифта основного текста
//                 // alert("У вас нет провинции")  // Тестовый алерт
//                 // window.location.href = 'choose-province.html';
//             }

//             // location.reload();
//         }

//     } catch (error) {
//         console.error('Ошибка при создании игровой сессии:', error);
//     }
// }


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

    // Вывод параметров в строку под меню
    // Дата и номер хода
    document.getElementById('year-turn').innerText = 'Дата: ' + statusGame.year + " Ход: " + statusGame.turn;
    // Деньги
    document.getElementById('player-gold').innerText = 'Богатство: ' + statusDynasty.gold; 
    // Очки действий
    document.getElementById('body-points').innerText = 'Очки действий: ' + statusDynasty.body_points; 
    // Готовность хода
    if (statusDynasty.end_turn) {
        document.getElementById('end-turn-bool').innerText = "Ход ГОТОВ"
    } else {
        document.getElementById('end-turn-bool').innerText = "Ход НЕ готов"
    }

}

// Функция записи данных в statusDynasty
function actualVarPlayer(res) {
    statusDynasty.dynasty_name = res[0].name
    // statusDynasty.player_name = res.player_name
    statusDynasty.gold = res[0].gold
    // statusDynasty.win_points = res.win_points

    statusDynasty.body_points = res[0].body_points
    statusDynasty.authority = res[0].authority
    statusDynasty.title = res[0].title

    statusDynasty.acts = res[0].acts
    // statusDynasty.result_logs_text = res.result_logs_text
    // statusDynasty.result_logs_text_all_turns = res.result_logs_text_all_turns
    // statusDynasty.end_turn = res.end_turn
    // statusDynasty.end_turn_know = res.end_turn_know


    console.log('!!!!!!!! statusGameDictPlayer');
    console.log(statusDynasty);

    // Выывод провинций игрока.
    // let tab = document.getElementById('table-user-province');
    // Передадим ид таблицы вторым аргументом.
    tabName = 'table-user-province'
    // Передадим список провинций первым аргументов.
    showProvs(res[1], tabName)
    // <td rowspan="2">

    // Запрос для обвновления данных на страничке.
    // Выполним для каждой функции, ибо пока не решена проблема асинхронности.
    updateVar();

}

// Общая функция вывода провинций. Запускается отдельно для провиций игрока и для всех остальных

function showProvs(provs, tabName) {

    // С бека мы получаем массив, нужен цикл для переноса инфы
    statusSettlements = []
    console.log("Вывод поселений.")
    for (i=0; i<provs.length; i++) {
        statusSettlements.push(provs[i])
        // statusSettlementsNames[res[1][i]["name_eng"]] = res[1][i]
        // statusSettlementsNamesRus[res[1][i]["name_rus"]] = res[1][i]
        // statusSettlementsId[res[1][i]["row_id"]] = res[1][i]
    }
    console.log("statusSettlements");
    console.log(statusSettlements);

    // ид элемента берем из аргумента.
    let tab = document.getElementById(tabName);
    tab.innerHTML = `            
        <thead>    
            <tr class="table table-province">

            </tr>
        </thead>`
    
    provs.forEach((item, num) => {
        tab.insertAdjacentHTML("beforeend",
            `
            <tr>                    
                <td>
                    Название: ${item["province_name"]}<br>
                    Население: ${item["population"]}<br>
                    Развитие: ${item["develop"]}<br>
                </td>

                <td>
                    Ландшафт: ${item["landscape"]}<br>
                    Река: ${item["to_river"]}<br>
                    Берег: ${item["to_sea"]}<br>

                </td>

                <td>
                    Статус: ${item["status"]}<br>
                    Крепость: ${item["fort"]}<br>

                </td>

                <td id='th-action'>
                    <div class="dropdown">

                        <button id="btn-act-${item["row_id"]}" class="dropbtn">Действия</button>

                        <div id="dropdownProv${item["row_id"]}" class="dropdown-content">
                            <a id="btn-act-build${item["row_id"]}">Строительство</a>
                            <a id="btn-act-decision${item["row_id"]}">Решения</a>
                        </div>

                    </div> 
                </td>
            
            </tr>
            `
        );
        tab.insertAdjacentHTML("beforeend", 
            `<td colspan="4" style="height: 1px;"></td>`
        );

        document.getElementById(`btn-act-${item["row_id"]}`).addEventListener(('click'), () => {
            console.log(`Нажата кнопка выбора действия в провинции с ид: ${item["row_id"]}`);
            dropdownProvince(item["row_id"])
        });

        // <a id="btn-act-war${item["row_id"]}">Атаковать</a>
        // document.getElementById(`btn-act-war${item["row_id"]}`).addEventListener(('click'), () => {
        //     console.log(`Нажата кнопка нападения на провинцию с ид: ${item["row_id"]}`);
        //     // Аргументы: ид целевого поселения, инфа об нашей армии
        //     console.log(`item["row_id"]: ${item["row_id"]}`)
        //     console.log(`res[3]: ${res[3]}`)
        //     // res[3] передаем всю армию, ид бек сам выберет. 
        //     // attack(item["row_id"], res[3]);
        // });
        document.getElementById(`btn-act-build${item["row_id"]}`).addEventListener(('click'), () => {
            console.log(`Нажата кнопка строительства в провинции с ид: ${item["row_id"]}`);
            console.log(`Что хранится в item: ${item}`);

            // menuNewBuilding(item);
        }); 
        document.getElementById(`btn-act-decision${item["row_id"]}`).addEventListener(('click'), () => {
            console.log(`Нажата кнопка решений в провинции с ид: ${item["row_id"]}`);
            console.log(`Что хранится в item: ${item}`);

            // startModalDonation(item);
        });               
    });
       
}




// // Открыващее меню для действий с поселениями/провинциями.
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownProvince(id_prov) {
    document.getElementById(`dropdownProv${id_prov}`).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 

// Функция записи данных в statusGame
function actualVarGame(res) {
    statusGame.game_id = res[0].row_id

    statusGame.year = res[0].year
    statusGame.turn = res[0].turn

    statusGame.cur_num_players = res[0].cur_num_players
    statusGame.max_players = res[0].max_players

    statusGame.winners = res[0].winner_id
    // statusGame.win_points_to_win = res.win_points_to_win

    statusGame.is_active = res[0].is_active
    statusGame.the_end = res[0].the_end

    statusGame.date_create = res[0].date_create

    console.log('!!!!!!!! statusGameDictGame');
    console.log(statusGame);


    // Выывод провинций игрока.
    // let tab = document.getElementById('table-user-province');
    // Передадим ид таблицы вторым аргументом.
    tabName = 'table-all-province'
    // Передадим список провинций первым аргументов.
    showProvs(res[1], tabName)

    // Запрос для обвновления данных на страничке.
    updateVar();
}

function updateAll() {

    requestStatusPlayer();
    requestStatusGame();
    // requestStatusProvinces();  // Передается с остальными данными игрока.
    // Запрос для обвновления данных на страничке.
    // Выполним для каждой функции, ибо пока не решена проблема асинхронности.
    updateVar();

}

updateAll()

///////////////////////////////////////////////
///////////////////////////////////////////////


///////////////////////////////////////////////
// Основные действия по кнопкам
///////////////////////////////////////////////

// Война

function attack(settl_id, army) {  // 404
    console.log("Запуск функции нападения.");
    console.log("Модалку временно не рисуем.");
    // console.log(settl_id);
    // console.log(army);
    statusDynasty.acts.push([`Атакуем: ${settl_id} (Вывести имена поселений)`, 
    404, settl_id, army]) 
    // postAct(statusGame.game_id);
    // logStart();
    // closeModal();
}


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


