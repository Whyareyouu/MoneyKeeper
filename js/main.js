let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

var money, time;

startBtn.addEventListener('click', function(){
    appData.l = true;
    time = prompt("Введите дату YYYY-mm-dd", "");
    money = +prompt("Каков ваш бюджет на месяц?");
    while(isNaN(money) || money == "" || money == null){
        money = +prompt("Каков ваш бюджет на месяц?", '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function(){
    if (appData.l == true ){
        let sum = 0;
        for (let i = 0; i< expensesItem.length; i++){
            let a = expensesItem[i].value,
                b = expensesItem[++i].value;
            if (typeof(a) === "string" && typeof(b) === "string" && typeof(a) != null && typeof(b) != null && a != "" && b != "" && a.length < 50 ){
                console.log ("done");
                appData.expenses[a] = b;
                sum += +b;
            }
            else {                          
                console.log ("bad result");
                i--;
            } 
        }
        expensesValue.textContent = sum  ;
    }
});

optionalExpensesBtn.addEventListener('click',function(){
    if (appData.l == true ){
        for (let i = 0; i< optionalExpensesItem.length; i++){
            let opt = optionalExpensesItem[i].value;
            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        }
    }
});

countBtn.addEventListener('click',function(){ 
    if (appData.l == true ){
        if(appData.budget != undefined ){
            appData.moneyPerDay = ((appData.budget - +expensesValue.textContent)/ 30).toFixed();
            dayBudgetValue.textContent = appData.moneyPerDay;
            if (appData.moneyPerDay < 100) { 
                levelValue.textContent = "Минимальный уровень достатка ";
            }
            else if (appData.moneyPerDay > 100 && appData.moneyPerDay <1000){
                levelValue.textContent = "Средний уровень достатка ";
            }
            else if (appData.moneyPerDay > 1000){
                levelValue.textContent = "У вас высокий достаток!!! ";
            }
            else{
                levelValue.textContent = "Вы ввели некорректные данные";
            }
        }
        else{
            dayBudgetValue.textContent = "Произошла ошибка";
        }
    }
});

incomeItem.addEventListener('input', function(){ //input сразу выводит информацию которую мы записали change, только после того, как мы убрали фокус с поля
    if (appData.l == true ){
        let items = incomeItem.value;
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
    }
});

checkSavings.addEventListener('click', function(){
    if (appData.l == true ){
        if(appData.savings == true){
            appData.savings = false;
        }
        else{
            appData.savings = true;
        }
    }
});

sumValue.addEventListener('click', function(){
    if (appData.l == true ){
        if(appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.monthIncome = (sum/100/12*percent).toFixed(1);
            appData.yearIncome = (sum/100*percent).toFixed(1);
            monthSavingsValue.textContent = appData.monthIncome;
            yearSavingsValue.textContent = appData.yearIncome;
        }
    }
});

percentValue.addEventListener('click', function(){
    if (appData.l == true ){
        if(appData.savings == true){
            let sum = +sumValue.value,
                percent = +percentValue.value;
            appData.monthIncome = (sum/100/12*percent).toFixed(1);
            appData.yearIncome = (sum/100*percent).toFixed(1);
            monthSavingsValue.textContent = appData.monthIncome;
            yearSavingsValue.textContent = appData.yearIncome;
        }
    }
});

var appData ={
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses:{},
    income: [],
    savings: false,
    moneyPerDay: 0,
    l: false,
};