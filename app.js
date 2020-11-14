const store = {

  questions: [
    { //Quiz start data 
      question: 'Ready Set?',
      buttonText: 'GO!', 
      answers: [],
      correctAnswer: 'The use of technology to automate a process that once, had to be done manually', 
      number: 0, 
      type: 'start'
    },
    { //Question 1 data 
      question: 'What is Industrial Automation?',
      answers: [
        'The use of technology to biuld cars',
        'The use of technology to automate a process that once, had to be done manually',
        'A stepping stone toward IRobot', 
        'Magic'
      ],
      correctAnswer: 'The use of technology to automate a process that once, had to be done manually',
      number: 1,
      type: 'question'
    },
    { //Question 2 data 
      question: 'Which industries use industrial automation?',
      answers: [
        'Food and Beverage',
        'Power', 
        'Biosciences and Pharmaceuticals',
        'All the above'
      ],
      correctAnswer: 'All the above',
      number: 2,
      type: 'question'

    }, 
    { //Question 3 data 
      question: 'What makes up a control loop?',
      answers: [
        'An input/sensor',
        'An input/sensor and a final control element',
        'An input/sensor, final control element and a controller function', 
        'none of the above'
      ],
      correctAnswer: 'An input/sensor, final control element and a controller function',
      number: 3,
      type: 'question'
    },
    { //Question 4 data 
      question: 'What does PLC stand for?',
      answers: [
        'Public Limited Company',
        'Programmable Logic Controller',
        'Power Line Communications',
        'Programable Lift Computer'
      ],
      correctAnswer: 'Programmable Logic Controller',
      number: 4,
      type: 'question'
    }, 
    { //Question 5 data 
      question: 'What does DCS stand for?',
      answers: [
        'Digital Cellular System',
        'Data Collection System',
        'Digital Cross-Connect', 
        'Distributed Control System'
      ],
      correctAnswer: 'Distributed Control System',
      number: 5,
      type: 'question'
    },
    { //Quiz end data 
      question: 'Finished!',
      buttonText: 'Start Over?', 
      answers: [],
      correctAnswer: '', 
      number: 6, 
      type: 'finish'
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/ 

//Start
function startTemplate(){
    return (
    `<form>
      <p>Industrial automation is the use of control systems, computers, robots, information technologies and intrumentation for handling different industry processes</p>
      <h2>${store.questions[0].question}</h2>
      <button type="submit" id="quizStart">${store.questions[0].buttonText}</button>
    </form>`
  ); 
}; 

//Quiz
function quizTemplate(){
    return (
    `<h2 class="question">${store.questions[store.questionNumber + 1].question}</h2> 
    <form>
        <p>Question number ${store.questionNumber + 1} of 5</p>
        <div class="questions">
          <div>
           <input type="checkbox" name="answer" id="answer1" value="${store.questions[store.questionNumber + 1].answers[0]}"> <lable for="answer1">${store.questions[store.questionNumber + 1].answers[0]}</lable>
          </div>
          <div>
            <input type="checkbox" name="answer" id="answer2" value="${store.questions[store.questionNumber + 1].answers[1]}"> <lable for="answer2">${store.questions[store.questionNumber + 1].answers[1]}</lable>
          </div>
          <div>
            <input type="checkbox" name="answer" id="answer3" value="${store.questions[store.questionNumber + 1].answers[2]}"> <lable for="answer3">${store.questions[store.questionNumber + 1].answers[2]}</lable>
          </div>
          <div>  
            <input type="checkbox" name="answer" id="answer4" value="${store.questions[store.questionNumber + 1].answers[3]}"> <lable for="answer4">${store.questions[store.questionNumber + 1].answers[3]}</lable>
        </div>
        <p>Your score is ${store.score} of 5</p>

        <button type="submit" id="next">Next Question</button>
    </form>`
  ); 
}; 

//End
function endTemplate(){
    return (`
    <form>
      <h2>${store.questions[6].question}</h2>
      <P>Your final score was  ${store.score} out of 5</P>
      <button type="submit">${store.questions[6].buttonText}</button>
    </form>`
  ); 
}; 

/********** RENDER FUNCTION(S) **********/

//Render Start Template
function renderStartTemplate(){
  console.log("renderStartTemplate ran")
  const startTemplateString = startTemplate();
  $('main').html(startTemplateString); 
};

//Render Quiz Template
function renderQuizTemplate(){
  console.log("renderQuizTemplate ran")
  const quizTemplateString = quizTemplate();
  $('main').html(quizTemplateString); 
};

//Render End Template
function renderEndTemplate(){
  console.log("renderEndTemplate ran")
  const endTemplateString = endTemplate(); 
  $('main').html(endTemplateString); 
};

//function render() that will house all 3 of the above funcitons and will rundepending on index number
function render(){
  if(store.questionNumber >= 5){
    renderEndTemplate(); 
  } else if(store.questionNumber < 5) {
    renderQuizTemplate();
    preventQuestionSkip_partA(); //add function here that disables the next question button until checkIfCorrect() is ran 
  } else if(store.questionNumber = 0) {
    renderStartTemplate(); 
  };   
}; 

/********** EVENT HANDLER FUNCTIONS **********/

//Trigger to bring quizTemplate in
function changeToQuizTemplate(){
  $('main').on('click', '#quizStart', function(event){
    event.preventDefault();  
    render(); 
  }); 
}; 

  //checks to see if radio value is == to correct answer 
function checkIfCorrect(){
  $('main').on('click', 'input', function(){
    if($(this).val() == store.questions[store.questionNumber + 1].correctAnswer){ 
      isCorrect();
      lockChoice();  
      preventQuestionSkip_partB();//add function here that enables the next question button after checkIfCorrect() is ran 
      addOneToScore(); 
    } else {
      isIncorrect();
      lockChoice(); 
      preventQuestionSkip_partB(); //add function here that enables the next question button after checkIfCorrect() is ran 
    };
  });   
}; 

//function if correct answer is chosen, added to checkIfCorrect()
function isCorrect(){
  $('form').append('<h3>Correct!</h3>');  
}; 

//function if incorrect answer is chosen, added to checkIfCorrect()
function isIncorrect(){
  $('form').append(`<h3>Woops! the correct answer is, <i>${store.questions[store.questionNumber + 1].correctAnswer}</i></h3>`); 
}; 

//function to lock radio input choice in (insert under isCorrect()/isIncorrect() in checkIfCorrect())
function lockChoice(){
  $("input").attr("disabled", true);
}; 

//Switch questions
function getIndex() {
  let index = store.questionNumber;
  return index;
}
//change index
function updateIndex() {
  if (getIndex() < store.questions.length - 1) {
      store.questionNumber++;
  }
  else {
      store.questionNumber = 1;
  }
}

//function that only lets someone move to next question if they have made a choice. 
function preventQuestionSkip_partA(){
  $('#next').attr('disabled', true); 
};

//function that only lets someone move to next question if they have made a choice. 
function preventQuestionSkip_partB(){
  $('#next').attr('disabled', false); 
};

//function that says "if question is correct then add +1 to store.score"
function addOneToScore(){
  store.score++;  
}; 
 
//next question
function nextQuestion(){
  $('main').on('click', '#next', function(event){
    event.preventDefault();
    updateIndex(); 
    render(); 
  });
}; 


//DONT FORGET TO ADD THE FUNCTION TO THIS!!!!!
function handleQuizApp(){
  renderStartTemplate();
  checkIfCorrect();
  changeToQuizTemplate();
  nextQuestion();
};  

$(handleQuizApp); 




/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)