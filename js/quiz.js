let currectAns, mainApp = document.getElementById('app'),
    currect = (localStorage.getItem('quiz_game_js_currect')) ? localStorage.getItem('quiz_game_js_currect') : 0,
    wrong = (localStorage.getItem('quiz_game_js_wrong')) ? localStorage.getItem('quiz_game_js_wrong') : 0;
document.addEventListener('DOMContentLoaded', () => {
    eventListerners();
    showLoading();
    loadQuestion();
});
eventListerners = () => {
    document.getElementById('Check').addEventListener('click', checkBtnClick);
    document.getElementById('reset').addEventListener('click', resetBtnClick);
}

const loadQuestion = () => {
    let url = "https://opentdb.com/api.php?amount=1";
    fetch(url)
        .then(response => { return response.json() })
        .then(data => displayQuestion(data.results[0]))
        .catch(error => { console.log(error) });
}
const showLoading = () => {

    let img = document.createElement('img');
    img.classList.add('aun', 'gifMargin');
    img.src = "https://github.com/Aunshon/JS-Quiz-Game/blob/master/aun.gif";
    img.width = "100";
    mainApp.appendChild(img);
}

const removeLoading = () => {
    let loading = document.querySelector(".aun");
    if (loading) {
        loading.remove();
    }
}

function displayQuestion(apiResponse) {
    console.log(apiResponse);
    let answers = apiResponse.incorrect_answers;
    currectAns = apiResponse.correct_answer;

    let insertPosition = Math.floor(Math.random() * 3);
    answers.splice(insertPosition, 0, currectAns);
    // console.log(answers);

    let questionHtml = document.createElement('div');
    questionHtml.classList = 'col-12';
    questionHtml.innerHTML = `
        <div class="row justify-content-between heading">
            <p class="category"> Category : ${apiResponse.category}</p>
            <div class="total">
                <span class="badge badge-success">${currect}</span>
                <span class="badge badge-danger">${wrong}</span>
            </div>
        </div>
        <h2 class="text-center">${apiResponse.question}</h2>
    `;

    let answerDiv = document.createElement('div');
    answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');

    answers.forEach(answer => {
        answerHtml = document.createElement('li');
        answerHtml.classList = 'col-12 col-md-5';
        answerHtml.textContent = answer;
        answerHtml.onclick = clickIt;
        answerDiv.appendChild(answerHtml);
    });

    questionHtml.appendChild(answerDiv);

    setTimeout(() => {
        removeLoading();
        mainApp.appendChild(questionHtml);
    }, 20);
}

clickIt = (e) => {
    const thisElement = e.target;
    let activeClasses = getActiveClass();
    if (activeClasses != '') {
        activeClasses.classList.remove('active');
    }
    thisElement.classList.add('active');
}

getActiveClass = () => {
    let activeClass = document.querySelector('.active');
    if (activeClass) {
        return activeClass;
    } else {
        return '';
    }
}

checkBtnClick = () => {
    let activeClass = getActiveClass();
    if (activeClass != '') {
        checkAnswer();
    } else {
        displayMessage("Please Select A Answer", "alert alert-danger col-md-6 text-center");
    }
}
displayMessage = (message, classes) => {
    let div = document.createElement('div');
    div.classList = classes;
    div.textContent = message
    mainApp.appendChild(div);
    setTimeout(() => {
        document.querySelector('.alert-danger').remove();
    }, 2000);
}

checkAnswer = () => {
    const selectedAns = document.querySelector('.questions .active').textContent;
    if (selectedAns === currectAns) {
        // console.log("Congrates!");
        currect++;
        localStorage.setItem('quiz_game_js_currect', currect);
    } else {
        // console.log("Wrong Ans");
        wrong++;
        localStorage.setItem('quiz_game_js_wrong', wrong);
    }
    let app = document.querySelector("#app");
    app.innerHTML = "";
    showLoading();
    loadQuestion();
}

function resetBtnClick() {
    localStorage.setItem('quiz_game_js_currect', 0);
    localStorage.setItem('quiz_game_js_wrong', 0);
    window.location.reload();
}
