// ==========================
// DATE PROJECT
// Part 1
// ==========================

// --------- Элементы ---------

const welcome = document.getElementById("welcome");
const form = document.getElementById("form");
const loading = document.getElementById("loading");
const question = document.getElementById("question");
const success = document.getElementById("success");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const typingText = document.getElementById("typingText");
const questionName = document.getElementById("questionName");
const finalText = document.getElementById("finalText");

const particles = document.getElementById("particles");

// --------- Данные ---------

let user = {};

// --------- Сердечки ---------

function createHeart(){

    const heart = document.createElement("div");

    heart.className="heart";

    heart.innerHTML=Math.random()>0.5?"❤️":"🤍";

    heart.style.left=Math.random()*100+"vw";

    heart.style.fontSize=(15+Math.random()*20)+"px";

    heart.style.animationDuration=(6+Math.random()*6)+"s";

    particles.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },12000);

}

setInterval(createHeart,250);

// --------- Переход ---------

function show(page){

    document.querySelectorAll(".page").forEach(p=>{

        p.classList.remove("active");

    });

    page.classList.add("active");

}

// --------- Первая кнопка ---------

startBtn.onclick=()=>{

    show(form);

};

// --------- Анкета ---------

nextBtn.onclick=()=>{

    const name=document.getElementById("name").value.trim();

    const date=document.getElementById("date").value;

    const time=document.getElementById("time").value;

    const place=document.getElementById("place").value.trim();

    if(!name||!date||!time||!place){

        alert("Пожалуйста, заполни все поля ❤️");

        return;

    }

    user={

        name,

        date,

        time,

        place

    };

    show(loading);

};

// --------- Печатающийся текст ---------

const messages = [
    "Спасибо, что ответила на мои вопросы...",
    "Остался всего один вопрос...",
    "И он очень важен для меня ❤️"
];

let messageIndex = 0;

function typeMessage(text, callback){

    typingText.innerHTML = "";

    let i = 0;

    const timer = setInterval(()=>{

        typingText.innerHTML += text[i];

        i++;

        if(i >= text.length){

            clearInterval(timer);

            setTimeout(callback,1000);

        }

    },40);

}

function startTyping(){

    if(messageIndex < messages.length){

        typeMessage(messages[messageIndex],()=>{

            messageIndex++;

            startTyping();

        });

    }else{

        questionName.innerHTML = user.name + ",";

        show(question);

    }

}

// --------- Запуск после анкеты ---------

const oldShow = show;

show = function(page){

    document.querySelectorAll(".page").forEach(p=>{

        p.classList.remove("active");

    });

    page.classList.add("active");

    if(page===loading){

        messageIndex=0;

        startTyping();

    }

}

// ==========================
// Убегающая кнопка "Нет"
// ==========================

let noClicks = 0;

const funnyTexts = [
    "Нет 🙈",
    "Точно нет? 🥺",
    "Подумай ещё ❤️",
    "Ну пожалуйста 😅",
    "Последний шанс 😏",
    "Все равно поймаю 😎"
];

noBtn.addEventListener("mouseover", () => {

    const area = document.querySelector(".buttons");

    const maxX = area.offsetWidth - noBtn.offsetWidth;

    const x = Math.random() * maxX;

    noBtn.style.transform = `translateX(${x - maxX/2}px)`;

    noClicks++;

    if (noClicks < funnyTexts.length) {
        noBtn.textContent = funnyTexts[noClicks];
    }

    yesBtn.style.transform = `scale(${1 + noClicks * 0.08})`;

});

// ==========================
// Кнопка "Да"
// ==========================

yesBtn.addEventListener("click", () => {

    fetch("https://blue-band-7090.spiderman150303.workers.dev", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: user.name,
        date: user.date,
        time: user.time,
        place: user.place
    })
});
    finalText.innerHTML = `
        <h1>❤️ Урааа!!! ❤️</h1>

        <p style="margin-top:20px;font-size:22px;">
            Я очень рад, что ты согласилась 😊
        </p>

        <p style="margin-top:20px;">
            📅 <b>${user.date}</b><br>
            🕒 <b>${user.time}</b><br>
            📍 <b>${user.place}</b>
        </p>

        <h2 style="margin-top:30px;">
            До встречи ❤️
        </h2>
    `;

    show(success);

});
