// ========================================
// QUESTIONS
// ========================================

const questions = [

    {
        question: "Which language is mainly used to structure a web page?",
        options: ["HTML", "Java", "Python", "SQL"],
        answer: "A"
    },

    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "SQL"],
        answer: "B"
    },

    {
        question: "Which language is used to add interactivity to a web page?",
        options: ["HTML", "CSS", "JavaScript", "MySQL"],
        answer: "C"
    },

    {
        question: "Which tag is used to create a paragraph?",
        options: ["<h1>", "<p>", "<br>", "<div>"],
        answer: "B"
    },

    {
        question: "Which property changes text color in CSS?",
        options: ["background", "font-size", "color", "text-style"],
        answer: "C"
    },

    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "##", "<!-- -->", "**"],
        answer: "A"
    },

    {
        question: "Which keyword is used to declare a variable?",
        options: ["int", "var", "string", "define"],
        answer: "B"
    },

    {
        question: "Which database is commonly used with web applications?",
        options: ["MySQL", "HTML", "CSS", "JavaScript"],
        answer: "A"
    },

    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: "B"
    },

    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: "A"
    },

    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<a>", "<link>", "<href>", "<url>"],
        answer: "A"
    },

    {
        question: "Which CSS property is used to change background color?",
        options: ["color", "background-color", "bgcolor", "background"],
        answer: "B"
    },

    {
        question: "Which JavaScript function is used to display a message box?",
        options: ["message()", "alert()", "display()", "popup()"],
        answer: "B"
    },

    {
        question: "Which HTML tag is used to display an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        answer: "B"
    },

    {
        question: "Which symbol is used to select an ID in CSS?",
        options: [".", "#", "*", "$"],
        answer: "B"
    },

    {
        question: "Which symbol is used to select a class in CSS?",
        options: ["#", ".", "*", "&"],
        answer: "B"
    },

    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        answer: "C"
    },

    {
        question: "Which JavaScript keyword creates a constant variable?",
        options: ["var", "let", "const", "constant"],
        answer: "C"
    },

    {
        question: "Which language is used to manage data in a database?",
        options: ["SQL", "HTML", "CSS", "JavaScript"],
        answer: "A"
    },

    {
        question: "Which HTML tag is used to create an unordered list?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: "B"
    }

];


// ========================================
// VARIABLES
// ========================================

let currentQuestion = 0;

let userAnswers =
    new Array(questions.length).fill(null);

let timeLeft = 30 * 60;

let timerInterval;


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    const questionElement =
        document.getElementById("question");

    if (!questionElement) {
        return;
    }

    const q = questions[currentQuestion];


    // Question
    questionElement.textContent =
        q.question;


    // Question number
    const questionNumber =
        document.getElementById("questionNumber");

    if (questionNumber) {

        questionNumber.textContent =
            "Question " + (currentQuestion + 1);

    }


    // Current question
    const currentQuestionElement =
        document.getElementById("currentQuestion");

    if (currentQuestionElement) {

        currentQuestionElement.textContent =
            currentQuestion + 1;

    }


    // Options
    const options =
        document.querySelectorAll(".option");


    for (let i = 0; i < options.length; i++) {

        const radio =
            options[i].querySelector("input");

        const text =
            options[i].lastElementChild;


        if (!radio || !text) {
            continue;
        }


        // Option text
        text.textContent =
            q.options[i];


        // A / B / C / D
        radio.value =
            String.fromCharCode(65 + i);


        // Restore answer
        radio.checked =
            userAnswers[currentQuestion] ===
            radio.value;

    }


    // Progress bar
    const progress =
        document.getElementById("progress");

    if (progress) {

        const percentage =
            ((currentQuestion + 1) /
                questions.length) * 100;

        progress.style.width =
            percentage + "%";

    }


    // Previous button
    const previousButton =
        document.getElementById("previousBtn");

    if (previousButton) {

        previousButton.disabled =
            currentQuestion === 0;

    }


    // Next / Submit buttons
    const nextButton =
        document.getElementById("nextBtn");

    const submitButton =
        document.getElementById("submitBtn");


    if (currentQuestion === questions.length - 1) {

        if (nextButton) {
            nextButton.style.display = "none";
        }

        if (submitButton) {
            submitButton.style.display = "inline-block";
        }

    } else {

        if (nextButton) {
            nextButton.style.display = "inline-block";
        }

        if (submitButton) {
            submitButton.style.display = "none";
        }

    }

}


// ========================================
// SAVE ANSWER
// ========================================

function saveAnswer() {

    const selected =
        document.querySelector(
            'input[name="answer"]:checked'
        );


    if (selected) {

        userAnswers[currentQuestion] =
            selected.value;

    }

}


// ========================================
// NEXT BUTTON
// ========================================

const nextButton =
    document.getElementById("nextBtn");


if (nextButton) {

    nextButton.addEventListener(
        "click",
        function () {

            saveAnswer();


            if (
                currentQuestion <
                questions.length - 1
            ) {

                currentQuestion++;

                showQuestion();

            }

        }
    );

}


// ========================================
// PREVIOUS BUTTON
// ========================================

const previousButton =
    document.getElementById("previousBtn");


if (previousButton) {

    previousButton.addEventListener(
        "click",
        function () {

            saveAnswer();


            if (currentQuestion > 0) {

                currentQuestion--;

                showQuestion();

            }

        }
    );

}


// ========================================
// TIMER
// ========================================

function startTimer() {

    const timerElement =
        document.getElementById("timer");


    if (!timerElement) {
        return;
    }


    function updateTimer() {

        const minutes =
            Math.floor(timeLeft / 60);

        const seconds =
            timeLeft % 60;


        const minuteText =
            minutes < 10
                ? "0" + minutes
                : minutes;


        const secondText =
            seconds < 10
                ? "0" + seconds
                : seconds;


        timerElement.textContent =
            minuteText + ":" + secondText;


        // Time over
        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerElement.textContent =
                "00:00";

            submitExam(true);

            return;

        }


        timeLeft--;

    }


    // Show immediately
    updateTimer();


    // Start countdown
    timerInterval =
        setInterval(updateTimer, 1000);

}


// ========================================
// SUBMIT EXAM
// ========================================

function submitExam(autoSubmit = false) {

    // Save last answer
    saveAnswer();


    // Stop timer
    clearInterval(timerInterval);


    // Calculate score
    let score = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (
            userAnswers[i] ===
            questions[i].answer
        ) {

            score++;

        }

    }


    // Total questions
    const total =
        questions.length;


    // Percentage
    const percentage =
        Math.round((score / total) * 100);


    // Save result
    localStorage.setItem(
        "examScore",
        score
    );


    localStorage.setItem(
        "examTotal",
        total
    );


    localStorage.setItem(
        "examPercentage",
        percentage
    );


    // Message
    if (autoSubmit) {

        alert(
            "Time is over!\n\n" +
            "Your Score: " +
            score +
            " / " +
            total
        );

    } else {

        alert(
            "Exam Submitted Successfully! 🎉\n\n" +
            "Your Score: " +
            score +
            " / " +
            total +
            "\nPercentage: " +
            percentage +
            "%"
        );

    }


    // Go to result page
    window.location.href =
        "result.html";

}


// ========================================
// SUBMIT BUTTON
// ========================================

const submitButton =
    document.getElementById("submitBtn");


if (submitButton) {

    submitButton.addEventListener(
        "click",
        function () {

            const confirmSubmit =
                confirm(
                    "Are you sure you want to submit the exam?"
                );


            if (confirmSubmit) {

                submitExam(false);

            }

        }
    );

}


// ========================================
// START EXAM
// ========================================

if (
    document.getElementById("question")
) {

    showQuestion();

    startTimer();

}