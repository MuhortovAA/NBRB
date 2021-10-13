//
const searchForm = document.querySelector('#search-form');
const currencyForm = document.querySelector('.currency');
let today = new Date();
let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

//
window.onload = function() {
    console.log('window');
    apiSearch(event);
};
//
function apiSearch(event) {
    event.preventDefault();
    const serverRates = `https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`;
    fetch(serverRates)
        .then(res => readResult(res))
        .then(json => readJson(json))
        .catch(error => readError(error));
};

// function SubSearch(event) {
//     event.preventDefault();
//     const searchText = document.querySelector(".datepicker").value;
//     const serverRates = `http://www.nbrb.by/api/exrates/rates?ondate=${searchText}&periodicity=0`;
//     fetch(serverRates)
//         .then(res => readResult(res))
//         .then(json => readJson(json))
//         .catch(error => readError(error));
// }

// searchForm.addEventListener('submit', SubSearch);
//
function GetDate(datestr) {

}
//
function readResult(value) {
    // console.log(value.json());
    return value.json();
}
//
function readJson(json) {
    let inner = `<table><tr><th>№</th><th>Валюта</th><th>Код</th><th>Курс</th></tr>`;
    let count = 1;
    // console.log(json);
    json.forEach(element => {
        // console.log(element);
        inner += `<tr><td>${count}</td><td  class="lc">${element.Cur_Name}</td><td>${element.Cur_Abbreviation}</td><td>${element.Cur_OfficialRate}</td></tr>`;
        count++;
    });
    currencyForm.innerHTML = inner + "</table>";
};
//
function readError(error) {
    currencyForm.innerHTML = "Что то пошло не так";
    console.error('error:' + error);
};

$('document').ready(function() {
    console.log('document');
    $("#datepicker").datepicker({

        dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        dateFormat: "dd.mm.yy",
        autoSize: true,
        changeMonth: true,
        changeYear: true,
        firstDay: 1,
        maxDate: "0",
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        onSelect: (select, event) => {
            GetData(select);
        },
        showAnim: "slideDown",
        showButtonPanel: true
    });
    //
    let datepicker = `${AddZero(today.getDate())}.${AddZero(today.getMonth()+1)}.${today.getFullYear()}`;
    $("#datepicker").val(datepicker);
});


function AddZero(item) {
    if (item < 10) {
        item = `0${item}`;
    }
    return item;
};

function GetData(selectDate) {
    let year = selectDate.substring(6);
    let month = selectDate.substring(3, 5);
    let day = selectDate.substring(0, 2);
    date = `${year}-${month}-${day}`;
    apiSearch(event);
    // console.log(date);
    // console.log(selectDate.substring(6));
    // console.log(selectDate.substring(3, 5));
    // console.log(selectDate.substring(0, 2));

}