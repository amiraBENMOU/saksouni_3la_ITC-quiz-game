document.getElementById("opened__text").innerText=localStorage.getItem("textValue");
// questions Part
class Question{
    constructor(text,choices,answer){
        this.text=text;
        this.choices=choices;
        this.answer=answer;
    }

    isCorrectAnswer(choice){
        return (this.answer === choice);
    }
}

  let questions =[
        new Question(
            "wach marnatha ITC ?",
            [ "IT Comunity  Club","In The Club","Into Technologie Club","In The Club"],"IT Comunity  Club"),
        new Question(
            "win jaya l ITC ?",
                  [ "pv4","pv3","pv1","pv8"],"pv1"),
         new Question(
              "ch7al kayen man Club fal pv1 ?",
              ["1","2","3","4"],"4"),
          new Question(
              "chkoun l president ta3 l ITC?",
              ["tayab chiboub","fady bougefa","ayoub chergrine","abdelaziz mousalem"],"tayab chiboub"),  
              new Question(
                "ch7al kayen man membre fal ITC?",
                ["100","190","200","80"],"190"),  
                new Question(
                    "ch7al kayen man team fal ITC?",
                    ["1","4","5","8"],"8"),   
                 new Question(
                        "winta takriyat l ITC?",
                        ["2015","2016","2017","2018"],"2016"), 
                 new Question(
                            "chkoun li machi team leader?",
                            ["mohamed kartali","loubna","bounedjar faycal","abdelkarim nachef"],"sohayb farouh"),            
 ];
 console.log(questions);
  
class Quiz{
    constructor (questions){
        this.score=0;
        this.questions=questions;
        this.currentQuestionIndex=0;

    }
 getCurrentQuestion(){
     return this.questions[this.currentQuestionIndex];

 }  
 guess (answer){
     if (this.getCurrentQuestion().isCorrectAnswer(answer)){
        this.score++;
        console.log(answer);
     }
     this.currentQuestionIndex++; 
 }
 hasEnded(){
     
  return this.currentQuestionIndex >= this.questions.length;
 } 
 
}

//group all the function for the display
const display = { 
    elementShown:function(id,text){
        let element= document.getElementById(id);
        element.innerHTML = text;
    },
    //end quiz
    endQuiz:function(){
         let div = document.getElementById("bg-model");
          
        if (div.style.display=='none'){
              div.style.display ='flex';
          }  
           let endQuizHtml= +quiz.score+"/"+quiz.questions.length;

    document.getElementById("end").innerText=(endQuizHtml);// we call the function elementShown 
        //close the div if we click in fermer button 
        document.getElementById("closee").addEventListener("click", closeDiv);
        function closeDiv(){
            div.style.display='none';
        }
        //replay the game
        document.getElementById("replay").addEventListener("click", replayGame);
        function replayGame(){
           
            window.location.replace("../saksouni_rla_itc/page1.html");

        }
         
        },
        

    question:function(){
        this.elementShown("ques",quiz.getCurrentQuestion().text);
  },   
    choices:function(){
        let choices=quiz.getCurrentQuestion().choices;
        guessHandler=(id,guess) => {
            document.getElementById(id).onclick=function(){//take the answer of the gamer
            quiz.guess(guess);
            quizApp();
            }
        }
         //display choices and handel guess
        for (let i=0 ;i<choices.length;i++){
            this.elementShown("choice"+i,choices[i]);
            guessHandler("guess"+i, choices[i]);
        }
    },
    //display the progress
    progress: function() {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress",  currentQuestionNumber + " / " + quiz.questions.length);
      },
    

};
//game logic

quizApp = () => {
    if(quiz.hasEnded()) {
        display.endQuiz();
        //END
    }else {
    //progress
    display.question();
     display.choices();
     display.progress();
     
    }
    
    
}

// 1-- create quiz
let quiz=new Quiz(questions);
 quizApp() // to enter the game logic part 

console.log(quiz.getCurrentQuestion().text);
 