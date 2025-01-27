console.log('Стрипт странички игры успешно загружен');

/////////////////////////////////////////////
// Основное оглавление
/////////////////////////////////////////////
// Параметры игрока и партии
// Обработка вкладок
// Функции запроса и загрузки данных с сервера
// Обновленние параметров и вывод на странице
// Основные действия по кнопкам в разных окнах......
// Отправка действий на сервер.
// Модальные окна

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
    player_id: 0,  // id игрока
    dynasty_name: "нет",               // Название династии.
    player_name: "",
    home_province_id: 0,
    gold: 0,                        // Казна игрока.
    win_points: 0,                  // Победные очки.

    body_points: 0,                 // Очки действия.
    authority: 0,                   // Авторитет.
    title: 0,                       // Титул.

    acts: [],                       // 
    result_logs_text: [],           // Логи за последний ход.
    result_logs_text_all_turns: [], // Логи за все ходы. 
    end_turn: false,                // Подтверждение готовности хода.
    end_turn_know: false,            // Оповещение о новом ходе.

    army: {},
    group_units: {},
    units: {},

    // Сохранение провинций по необходимости.
    provinces: {},

}

// Параметры партии
let statusGame = {
    game_id: "",        // ИД партии. Будем передавать вместе с ходом? !!! Обязательно!!!

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

    // Логи
    result_public_logs_text: [],           // Логи за последний ход.
    result_public_logs_text_all_turns: [], // Логи за все ходы. 
    date_create: "",

    // Сохранение провинций.
    provinces: {}, // Необходимы данные, в которых будет храниться список соседей для навигации
    provinces_names: {},  // Названия провинций для отображения в различных случаях. {id: names}
}

/////////////////////////////////////////////
/////////////////////////////////////////////


/////////////////////////////////////////////
// Получение модалки, 
// требуется заранее обьявить переменную modal.
/////////////////////////////////////////////

// Модальное окно.
// Получение самого элемента вверху скрипта.
// // Получить модальное окно.
const modal = document.getElementById("my-modal");

// Получить кнопку, которая открывает модальное окно
const btnShowAllLogsParty = document.getElementById("show_all_logs_party");
const btnShowAllLogsPartyPlayers = document.getElementById("show_all_logs_party_players");

// // Получить элемент <span>, который закрывает модальное окно.
const span = document.getElementsByClassName("close")[0];

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
    // Видимо где-то был вывод карты, но сейчас это не дает сохранить последнюю открытую вкладку.
    // // Дополнительно скроем меню провинций
    // document.getElementById("table-province").setAttribute('style', 'display: none');

    localStorage.setItem('last-opened-tab', 'army-button');
});
// Игроки
document.getElementById('players-button').addEventListener('click', () => {
    hiddenAllWindows();
    document.getElementById("players-window").setAttribute('style','visibility:visible');
    document.getElementById("players-button").setAttribute('style','color:red; cursor: pointer;');
    // Видимо где-то был вывод карты, но сейчас это не дает сохранить последнюю открытую вкладку.
    // // Откроем меню провинций
    // document.getElementById("table-province").setAttribute('style', 'visibility: visible');

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
    // Отключаем отловку ошибок, ибо при разработке не видно в чем проблема.
    // try {
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

    // } catch (error) {
    //     console.error('Ошибка при создании игровой сессии:', error);
    // }
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
                // !!!!! Необходимо релизовать полноценный вариант игры без провинции. 
                // !!!!! Пока даже не выводятся параметры игрока.
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

///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// Обновленние параметров и вывод на странице.
///////////////////////////////////////////////////
// Основная функция обновления параметров на страничке.

// Функция записи данных в statusDynasty, после получения данных с сервера.
// Функция записи данных в statusDynasty, после получения данных с сервера.

// Общая функция вывода провинций. Запускается отдельно для провиций игрока и для всех остальных.
// Функция отображения отрядов юнитов.

// Открыващее меню для действий с поселениями/провинциями.

///////////////////////////////////////////////////



// Основная функция обновления параметров на страничке
// Запускается два раза после actualVarPlayer и actualVarGame = не круто.
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

// Функция записи данных в statusDynasty, после получения данных с сервера.
function actualVarPlayer(res) {
    // console.log('!!!!!!!! statusDynasty');
    // console.log(statusDynasty);
    console.log('!!!!!!!! actualVarPlayer res');
    console.log(res);

    // res - получение данных с сервера
    // [0] - основные параметры игрока, обьект(словарь)
    // [1] - управляемые провинции, обьект(словарь)
    // [2] - массив с данными об войсках, массив(список)
    // [2][0] - данных об армиях, хз что тут
    // [2][1] - данных об отрядах, хз что тут
    // [2][2] - данных о юнитах, хз что тут
    // [3] - логи за последний ход. для получения более ранних необходим отдельный запрос, выполняемый по необходимости, дабы не нагружать сеть.

    // Запись основных параметров игрока.
    statusDynasty.dynasty_name = res[0].dynasty_name
    statusDynasty.player_id = res[0].player_id,  // id игрока
    // statusDynasty.player_name = res.player_name
    statusDynasty.gold = res[0].gold
    // statusDynasty.win_points = res.win_points

    statusDynasty.body_points = res[0].body_points
    statusDynasty.authority = res[0].authority
    statusDynasty.title = res[0].title

    statusDynasty.acts = res[0].acts

    statusDynasty.result_logs_text = res[3]
    // statusDynasty.result_logs_text_all_turns = res[0].result_logs_text_all_turns

    statusDynasty.end_turn = res[0].end_turn
    statusDynasty.end_turn_know = res[0].end_turn_know

    statusDynasty.provinces = res[1]
    statusDynasty.home_province_id = res[0].home_province_id
    // console.log(`statusDynasty.provinces ${statusDynasty.provinces}`)
    // console.log(`statusDynasty.provinces[0] ${statusDynasty.provinces[0]["row_id"]}`)


    // Вывод провинций игрока.
    // Передадим ид таблицы вторым аргументом.
    tabName = 'table-user-province'
    // Передадим список провинций первым аргументов.
    showProvs(res[1], tabName, "player")
    // <td rowspan="2">

    // Вывод отрядов игрока.
    // Данные об отрядах передадим аргументом.
    showUnits(res[2][1]); 
    
    // Вывод армий игрока.
    // Данные об армиях передадим аргументом.
    showArmy(res[2][0]); 

    // Запрос для обвновления данных на страничке.
    // Выполним для каждой функции, ибо пока не решена проблема асинхронности.
    updateVar();

    // Логи.
    logStart();     // Планируемые действия.
    logResultStart();   // Лог игрока прошлого хода. Общедоступные запускаются из statusGame

    // Окошко информирования о новом ходе.
    if (statusDynasty.end_turn_know == 0) {
        console.log(`Ход не получен.`);
        confimRecTurnModal();
    } else {
        console.log(`Ход получен.`);
    };

    // Проверим итог в консоли.
    console.log('!!!!!!!! Параметры игрока.');
    console.log(statusDynasty);
}

// Функция записи данных в statusGame, после получения данных с сервера.
function actualVarGame(res) {
    console.log('!!!!!!!! actualVarGame res');
    console.log(res)
    // res[0] Словарь с основными параметрами партии
    // res[1] Список с провинциями
    // res[1][0] Словарь с провинциями
    // res[1][1] Словарь с названиями провинций, гда ключ ид, а значение имя.
    // res[2] Общедоступные логи.
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

    // Сохраним провинции.
    statusGame.provinces = res[1][0]
    statusGame.provinces_names = res[1][1]

    // Логи
    statusGame.result_public_logs_text = res[2]

    // Выывод провинций игрока.
    // let tab = document.getElementById('table-user-province');
    // Передадим ид таблицы вторым аргументом.
    tabName = 'table-all-province'
    // Передадим список провинций первым аргументов.
    showProvs(res[1][0], tabName)

    // Запрос для обвновления данных на страничке.
    updateVar();

    logPublicResultStart();
    
    // Проверим итог в консоли.
    console.log('!!!!!!!! Параметры игры.');
    console.log(statusGame);
}

// Запросы к серверу для получения данных о партии и игроке.
function updateAll() {

    requestStatusPlayer();
    requestStatusGame();
    // requestStatusProvinces();  // Передается с остальными данными игрока.
    // Запрос для обвновления данных на страничке.
    // Выполним для каждой функции, ибо пока не решена проблема асинхронности.
    updateVar();

}

// Общая функция вывода провинций. Запускается отдельно для провиций игрока и для всех остальных
// type - передаем тип провинции, например провинции игрока.
function showProvs(provs, tabName, type) {

    // С бека мы получаем массив, нужен цикл для переноса инфы
    statusSettlements = []
    console.log(`Вывод поселений. ${type}`)
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

    // Кнопка атаки
    let attak_button = ""
    // Кнопка строительства
    let buildings_button = ""
    // Кнопка повышения развития
    let develop_button = ""

    tab.innerHTML = `            
        <thead>    
            <tr class="table table-province">

            </tr>
        </thead>`
    
    provs.forEach((item, num) => {
        // console.log(`Рисуем провинцию с ид: ${item["row_id"]} таблица ${tabName}`);
        // Кнопки для провинций не принадлежащих игроку. Война.
        // !!!! Необходимо решить выводить ли провинции игрока на вкладке карта
        if (type != "player") {
            // На общей карте не выводим провинции игрока.
            if (item["ruler_id"] == statusDynasty.player_id) {
                return;
            }
            // Иначе можно нарисовать кнопку атаки.
            attak_button = `<a id="btn-act-attack-${item["row_id"]}-${tabName}">Атака</a>`
        }
        // Кнопки для провинций игрока. Строительство, развитие.
        if (type == "player") {            
            // Кнопка строительства, только если провинция принадлежит игроку.
            buildings_button = `<a id="btn-act-build-${item["row_id"]}-${tabName}">Строительство</a>`
            // Кнопка повышения развития, только если провинция принадлежит игроку.
            develop_button = `<a id="btn-act-develop-${item["row_id"]}-${tabName}">Развитие</a>`
        }
        // Опеределим статус.
        let status_province = item["status"]
        // console.log(`Определяем статус провинции: item["row_id"] ${item["row_id"]}. statusDynasty["home_province_id"] ${statusDynasty["home_province_id"]}`)
        
        // console.log(`StatusDynasty ${statusDynasty.home_province_id}`)
        if (item["row_id"] == statusDynasty["home_province_id"]) {
            status_province = "Столица"
        } else if (type == "player") {
            status_province = "Наше"
        } else {
            status_province = "Неизвестно"
        }
        // let status_province = "Неизвестно"
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
                    Статус: ${status_province}<br>
                    Крепость: ${item["fort"]}<br>

                </td>

                <td id='th-action'>
                    <div class="dropdown">

                        <button id="btn-act-${item["row_id"]}-${tabName}" class="dropbtn">Действия</button>

                        <div id="dropdownProv-${item["row_id"]}-${tabName}" class="dropdown-content">
                            ${attak_button}
                            ${buildings_button}   
                            ${develop_button}                            
                            <a id="btn-act-decision-${item["row_id"]}-${tabName}">Решения</a>
                        </div>

                    </div> 
                </td>
            
            </tr>
            `
        );
        tab.insertAdjacentHTML("beforeend", 
            `<td colspan="4" style="height: 1px;"></td>`
        );

        document.getElementById(`btn-act-${item["row_id"]}-${tabName}`).addEventListener(('click'), () => {
            console.log(`Нажата кнопка выбора действия в провинции с ид: ${item["province_name"]}`);
            dropdownProvince(item["row_id"], tabName)
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
        // Повесим событие на кнопку строительства.
        try {
            document.getElementById(`btn-act-build-${item["row_id"]}-${tabName}`).addEventListener(('click'), () => {
                console.log(`Нажата кнопка строительства в провинции с ид: ${item["province_name"]}`);
                
                // menuNewBuilding(item);
            }); 
        } catch (error) {
            // console.log(error)
        }
        // Повесим событие на кнопку решений.
        try {
            document.getElementById(`btn-act-decision-${item["row_id"]}-${tabName}`).addEventListener(('click'), () => {
                console.log(`Нажата кнопка решений в провинции с ид: ${item["province_name"]}`);
                
                // startModalDonation(item);
            }); 
        } catch (error) {
            // console.log(error)            
        }
        // Повесим событие на кнопку повышения развития.
        try {
            document.getElementById(`btn-act-develop-${item["row_id"]}-${tabName}`).addEventListener(('click'), () => {
                console.log(`Нажата кнопка повышения развития в провинции ${item["province_name"]}`);
                enhanceDevelopment(item["row_id"])
                // startModalDonation(item);
            }); 
        } catch (error) {
            // console.log(error)            
        }
    });       
}

// Функция отображения отрядов
function showUnits(group_units) {
    let unitsTab = document.getElementById('table-units');
    if (group_units.length > 0) {
        unitsTab.innerHTML = ''
        unitsTab.insertAdjacentHTML('beforeend', `            
            <thead>    
                <tr class="table-units">
                    <th class="th"><span"> Расположение</span> </th>

                    <th class="th"><span class="rotate-sm-90"> Кол-во.</span></th>
                    <th class="th"><span class="rotate-sm-90"> HP</span></th>
                    <th class="th"><span class="rotate-sm-90"> Выносл.</span></th>

                    <th class="th"><span class="rotate-sm-90"> Сила</span></th>
                    <th class="th"><span class="rotate-sm-90"> Ловкость</span></th>

                    <th class="th"><span class="rotate-sm-90"> Броня</span></th>
                    <th class="th"><span class="rotate-sm-90"> Щит</span></th>

                    <th class="th"><span class="rotate-sm-90"> Бл. бой</span></th>
                    <th class="th"><span class="rotate-sm-90"> Оружие</span></th>
                    <th class="th"><span class="rotate-sm-90"> Дал. бой</span></th>
                    <th class="th"><span class="rotate-sm-90"> Лук</span></th>
                    <th class="th"><span class="rotate-sm-90"> Опыт</span></th>
                    <th class="th">Имя</th>
                    <th class="th"></th>
                </tr>
            </thead>`)
        console.log("Собираем отряды.");
        console.log(group_units)
        for (i=0;i<group_units.length;i++) {
            console.log(`Вывод отряда ${group_units[i]}`)
            unitsTab.insertAdjacentHTML("beforeend", 
                `<tr class="table units">
                    <td>${group_units[i]["location_name"]}</th>
                    <td>${group_units[i]["count_units"]}</th>
                    <td>${group_units[i]["hp_cur"]}/${group_units[i]["hp_max"]}</th>
                    <td>${group_units[i]["endurance_cur"]}/${group_units[i]["endurance_max"]}</th>
                    <td>${group_units[i]["strength"]}</th>
                    <td>${group_units[i]["agility"]}</th>
                    <td>${group_units[i]["armor"]}</th>
                    <td>${group_units[i]["shield"]}</th>
                    <td>${group_units[i]["melee_skill"]}</th>
                    <td>${group_units[i]["melee_weapon"]}</th>
                    <td>${group_units[i]["ranged_skill"]}</th>
                    <td>${group_units[i]["ranged_weapon"]}</th>
                    <td>${group_units[i]["experience"]}</th>
                    <td>${group_units[i]["name"]}</th>
                    
                    <td><label for="cheсked-unit-${group_units[i]["row_id"]}">Выбрать
                            <input class="cheсked-unit" id="cheсked-unit-${group_units[i]["row_id"]}" type="checkbox">
                        </label>
                    </dh>
                                    
                </tr>`
            );

        }

        // // Кнопка подтвердить для изменений с юнитаи
        // document.getElementById('apply-changes-units').addEventListener('click', () => {
        //     const chooseAction = document.getElementById('unit-select-action');
        //     console.log("Выбираем действие с юнитами.");
        //     console.log(chooseAction.value);
        //     const checkBoxs = document.querySelectorAll('.cheсked-unit');
        //     let ckeckedUnits = []  // Список для сохранание ид выбранных юнитов.
        //     for (c=0;c<checkBoxs.length;c++) { 
        //         if (checkBoxs[c].checked) {
        //             ckeckedUnits.push(checkBoxs[c].id.slice(13))
        //         }
        //     }
        //     console.log(`Выбранные юниты: ${ckeckedUnits}`)
        //     let arg = [ckeckedUnits]  // Первый аргумент список юнитов. Остальное добавлять по необходимости.
        //     if (ckeckedUnits.length > 0) {
        //         if (chooseAction.value == "dismiss") {
        //             console.log("dismissUnits");
        //             console.log(arg);
        //             dismissUnits(arg)
        //         } else if (chooseAction.value == "train") {
        //             console.log("trainUnits");
        //             console.log(arg);
        //             trainUnits(arg)
        //         } else if (chooseAction.value == "create-army") {
        //             console.log("createArmy");
        //             console.log(arg);
        //             // Если не выбрана армия к которой присоединяются юниты, передаем 0, будет создана новая
        //             arg.push(0)
        //             createArmy(arg)
        //         }
        //     } else {
        //         alert("Юниты не выбраны.")
        //     }

        // });
    }

}

// Функция отображения армий
function showArmy(army) {
    let unitsTab = document.getElementById('table-army');
    if (army.length > 0) {
        unitsTab.innerHTML = ''
        unitsTab.insertAdjacentHTML('beforeend', `            
            <thead>    
                <tr class="table-army">
                    <th class="th"><span">Расположение</span> </th>
                    <th class="th"><span">Дом.провинция</span> </th>

                    <th class="th"><span class="rotate-sm-90">Отряды</span></th>
                    <th class="th"><span class="rotate-sm-90">Юниты</span></th>

                    <th class="th"><span class="rotate-sm-90">HP</span></th>
                    <th class="th"><span class="rotate-sm-90">Выносл</span></th>


                    <th class="th">Имя</th>
                    <th class="th"></th>
                </tr>
            </thead>`)
        console.log("Собираем армии.");
        console.log(army)
        for (i=0;i<army.length;i++) {
            console.log(`Вывод армий ${army[i]}`)
            // Необходимо обработать 0-ю локацию
            let location = statusGame.provinces_names[army[i]["location"]]
            if (typeof(location) == "undefined") {location = "Неопределено"}
            let home_location = statusGame.provinces_names[army[i]["home_location"]]
            if (typeof(home_location) == "undefined") {home_location = "Неопределено"}

            unitsTab.insertAdjacentHTML("beforeend", 
                `<tr class="table units">
                    <td>${location}</th>
                    <td>${home_location}</th>

                    <td>${army[i]["count_groups"]}</th>
                    <td>${army[i]["count_units"]}</th>

                    <td>${army[i]["hp_cur"]}/${army[i]["hp_max"]}</th>
                    <td>${army[i]["endurance_cur"]}/${army[i]["endurance_max"]}</th>

                    <td>${army[i]["name"]}</th>
                    
                    <td><label for="cheсked-unit-${army[i]["row_id"]}">Выбрать
                        <input class="cheсked-unit" id="cheсked-unit-${army[i]["row_id"]}" type="checkbox">
                        </label>
                    </td>                                    
                </tr>`
            );
        }
    } else {
        unitsTab.innerHTML = 'нет'
    }
    
}

// Открыващее меню для действий с поселениями/провинциями.
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownProvince(id_prov, tabName) {
    console.log("Запуск всплывающего окошка.");

    document.getElementById(`dropdownProv-${id_prov}-${tabName}`).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
// !!!!!!!!!! Внимание, тут код взятый у чата.
// window.onclick = function(event) {
//     if (!event.target.matches('.dropbtn')) {
  
//       var dropdowns = document.getElementsByClassName("dropdown-content");
//       var i;
//       for (i = 0; i < dropdowns.length; i++) {
//         var openDropdown = dropdowns[i];
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show');
//         }
//       }
//     }
//   } 
// Обработчик клика по всему окну
window.onclick = function(event) {
    // Получаем все всплывающие окна
    var dropdowns = document.getElementsByClassName("dropdown-content");

    // Закрываем все открытые положения
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }

    // Если нажата кнопка с классом "dropbtn"
    if (event.target.matches('.dropbtn')) {
        // Находим всплывающее меню, связанное с нажатой кнопкой
        var dropdown = event.target.nextElementSibling; // Предполагается, что меню сразу следует за кнопкой

        // Переключаем состояние видимости меню
        dropdown.classList.toggle('show');
    }
}

// Запросы к серверу для получения данных о партии и игроке.
// Вывод данных на странице.
updateAll()

///////////////////////////////////////////////////
///////////////////////////////////////////////////


///////////////////////////////////////////////////
// Действия и логи.
///////////////////////////////////////////////////
// Лог действий.
// Лог итогов нашего хода.
// Лог итогов хода всех игроков.


// Лог действий.
function logStart() {       //Функция запуска будущего лога
    let listLogs = document.getElementById('logs');
    listLogs.innerText = 'Ваши действия';  // Очистим
    if (statusDynasty.body_points - statusDynasty.acts.length < 0) {
        listLogs.innerText += '\n Внимание, вы запланировали больше чем у вас доступно "очков действий", все не выполненные перенесутся на следующий ход.'
    }
    statusDynasty.acts.forEach((item, num) => {  
        // let a = document.getElementById('logs');
        listLogs.insertAdjacentHTML('beforeend', `<div>${num + 1}: ${item[0]}</div>`);
    });
}

// Лог итогов нашего хода.
function logResultStart() {      
    document.getElementById('logs-result').innerText = 'Лог прошлого хода';  // Очистим + подсказка
    console.log(`Тут выведем логи игрока: ${statusDynasty.result_logs_text}`)
    statusDynasty.result_logs_text.forEach((item, num) => {  
        let a = document.getElementById('logs-result');
        a.insertAdjacentHTML('beforeend', `<div>${num + 1}: Ход ${item["turn"]}. ${item["text"]}</div>`);
    }); 
}

// Лог итогов хода всех игроков.
function logPublicResultStart() {       
    document.getElementById('public-logs-result').innerText = 'Общий лог прошлого хода';  // Очистим + подсказка
    console.log(`Тут выведем общедоступные логи: ${statusGame.result_public_logs_text}`)
    statusGame.result_public_logs_text.forEach((item, num) => {  
        let a = document.getElementById('public-logs-result');
        a.insertAdjacentHTML('beforeend', `<div>${num + 1}: Ход ${item["turn"]}. ${item["text"]}</div>`);
    }); 
}
///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// Армия. Основные действия по кнопкам 
///////////////////////////////////////////////////
// Создание пустой армии
// Война

///////////////////////////////////////////////////

// Создание пустой армии

// Получение фиксированной(рисуется не по циклам) кнопки. Создаем сразу с запросом
document.getElementById('create-empty-army').addEventListener(('click'), () => {
    console.log("Запуск функции создания пустой армии.");
    console.log("Модалку временно не рисуем.");
    // createArmy(["Создаем пустую армию.", 901]);  // Это функция для сздания армии с отрядами
    // !!! Необходим аргумент стартовой позиции?
    postInstantAction(["Создаем пустую армию.", 901]);  
    console.log("Создаем пустую армию., 901");
});
// Функция создания моментальной армии
function createArmy(arg) {  // 902...
    console.log("Модалку временно не рисуем.");
    // let action = [`Заглушка для текста действия`, ]
    // postInstantAction(arg);
    logStart();
    // closeModal();
}



///////////////////////////////////////////////////
///////////////////////////////////////////////////


///////////////////////////////////////////////////
// Провинции(поселения). Основные действия по кнопкам 
///////////////////////////////////////////////////
// Развитие
// Война

///////////////////////////////////////////////////

// Развитие. Простая стартовая механика, для повышения уровня развития.
function enhanceDevelopment(settl_id) {  // 101
    console.log("Запуск функции развития.");
    console.log("Модалку временно не рисуем.");
    console.log(settl_id);
    console.log(statusGame.provinces_names);
    statusDynasty.acts.push([`Повышаем развитие в ${statusGame.provinces_names[settl_id]}.`, 
    101, settl_id]) 
    console.log(statusDynasty.acts);
    postAct();
    logStart();
    // closeModal();
}

// Война
function attack(settl_id, army) {  // 404
    console.log("Запуск функции нападения.");
    console.log("Модалку временно не рисуем.");
    // console.log(settl_id);
    // console.log(army);
    statusDynasty.acts.push([`Атакуем: ${settl_id} (Вывести имена поселений)`, 
    404, settl_id, army]) 
    // postAct(statusGame.game_id);
    logStart();
    // closeModal();
}


///////////////////////////////////////////////////
///////////////////////////////////////////////////


///////////////////////////////////////////////////
// Отправка действий на сервер.
///////////////////////////////////////////////////
// Событие на кнопку отправки хода.
// Функция отправки действий, заново отправляется весь список.
// Функция отправки(подтверждения) хода.

// Подтвердить получение хода, чтобы не вылазило оповещение.
///////////////////////////////////////////////////



// Событие на кнопку отправки хода.
// Отправка хода с модалкой.
document.getElementById('end-turn-btn').addEventListener('click', () => {
    if (statusDynasty.acts.length < statusDynasty.body_points) {
        // confimModalEndTurd("У вас еще остались очки действий. Точно отправить ход?")
        modal.style.display = "block";
        let content = document.getElementById("show-content");
        content.innerHTML = `<div style="font-size: 25px">У вас еще остались очки действий. Точно отправить ход?</div>`
        content.innerHTML += `<button onclick = "postTurn(statusGame.game_id); closeModal();" style="font-size: 25px; width: 100px">Да</button>`
        content.innerHTML += `<button onclick = closeModal() style="font-size: 25px; width: 100px">Нет</button>`
    } else {
        postTurn(statusGame.game_id);
    }
    // postTurn(statusGame.game_id); // Передадим ИД партии аргументом, он сразу уйдет на Бек для определения к какой партии присвоить ход
})

// Функция отправки действий, заново отправляется весь список.
// Отключаем отловку ошибок, ибо при разработке не видно в чем проблема.
async function postAct() {
    console.log("Запрос на отправку действий. 1");
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

    try {
        const response = await fetch(`${apiUrl}/post_act?game_id=${statusGame.game_id}`, {
                    
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusDynasty.acts) // Все действия отправляются по отдельности
            
        });
        
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        } else {
            console.log("Запрос на отправку действий. 2");
        }

    } catch (error) {
        console.error('Ошибка postAct:', error);
    }
};

// Функция отправки(подтверждения) хода.
// Отключаем отловку ошибок, ибо при разработке не видно в чем проблема.
async function postTurn() {
    console.log("Запрос на отправку хода. 1");
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

        try {      
            const response = await fetch(`${apiUrl}/post_turn?game_id=${statusGame.game_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                    'Content-Type': 'application/json',
                },
                // Сервер это на данные момент не обрабатывает, ибо...
                // Все действия отправляются по отдельности
                body: JSON.stringify(statusDynasty.acts) 
            });
            
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            } else {
                console.log("Запрос на отправку хода.");
                // Что тут возвращается с сервера?
                // let res = await response.json()
                // console.log(res);
                // actualVarGame(res);
                location.reload();
            }

        } catch (error) {
            console.error('Ошибка postTurn:', error);
        }

};

// Функция отправки моментального действия.
// Отключаем отловку ошибок, ибо при разработке не видно в чем проблема.
async function postInstantAction(action) {
    console.log("Запрос на отправку моментального действия.");
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');

        try {                
            const response = await fetch(`${apiUrl}/post_instant_action?game_id=${statusGame.game_id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                    'Content-Type': 'application/json',
                },
                // Тут необходимо в обычный для действия виде отправить моментальное действие.
                body: JSON.stringify(action) 
            });
            
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            } else {
                console.log("Запрос на отправку хода.");
                // Что тут возвращается с сервера?
                // let res = await response.json()
                // console.log(res);
                // actualVarGame(res);
                // location.reload();
            }

        } catch (error) {
            console.error('Ошибка postInstantAction:', error);
        }

};


// Подтвердить получение хода, чтобы не вылазило оповещение
async function confirmRecTurn() { 
    const token = localStorage.getItem('token');
    // Получим url из локального хранилища. Устанавливается в menu.js
    const apiUrl = localStorage.getItem('apiUrl');
    closeModal(); // Закроем модальное окошко

    try {
        const response = await fetch(`${apiUrl}/confirm_rec_turn?game_id=${statusGame.game_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Здесь мы добавляем токен в заголовок
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error('Сеть ответила с ошибкой: ' + response.status);
        } else {
            console.log("Запрос на подтверждение получения хода.");
            // Что тут возвращается с сервера?
            // let res = await response.json()
            // console.log(res);
            // actualVarGame(res);
            // location.reload();
        }

    } catch (error) {
        console.error('Ошибка при создании игровой сессии:', error);
    }
}

///////////////////////////////////////////////////
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// Модальные окна.
///////////////////////////////////////////////////

// Открыть модальное окно по нажатию.
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
    console.log("Подтверждаем получение хода.")
    statusDynasty.end_turn_know = 1;
}


