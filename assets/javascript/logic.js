$(document).ready(function() {
    //controls which sub-object in the gameData object to select
    //by using this array.
    var currentQuestion = ["question-one", "question-two", "question-three", "question-four", "question-five"];
    //This object contains all of the info for the game. Each question will have a choice of words, a correct answer, and an image
    var gameData = {
            "question-one": {
                "question": "If I multiply any even number by 1,895, what will be in the ones column?",
                "choices": ["0", "Random", "3"],
                "correct": "0",
                "image": 'url("assets/images/color.png")'
            },
            "question-two": {
                "question": "Without using a calculator, what number did I multiply by 11 to get 737?",
                "choices": ["737 is prime", "52", " 71", "67"],
                "correct": "67",
                "image": 'url("assets/images/spinblur.png")'
            },
            "question-three": {
                "question": "This one is a freebie, pick index number 3 already",
                "choices": [3, 4, 11, 1],
                "correct": 1,
                "image": 'url("assets/images/pixelblur.png")'
            },
            "question-four": {
                "question": "If I switch from using rgb color schemes to rgba(the a stands for alpha), what does the a control",
                "choices": ["Nothing", "Sepia filter", "Opacity"],
                "correct": "Opacity",
                "image": 'url("assets/images/lines.png")'
            },
            "question-five": {
                "question": "How many keys are there on a Piano",
                "choices": ["70", "88", "65", "42"],
                "correct": "88",
                "image": 'url("assets/images/shadow2.png")'
            },
            //!<--end of question section of gameData object
            "gameMechanics": {
                timerCount: function() {
                    time = 30;
                    timeControl = setInterval(this.timer, 1000);
                    $("#timer").addClass("time-display").html(time + " seconds remaining");
                }, //!<--ends timeCount function 
                timer: function() {
                    time--;
                    $("#timer").html(time + " seconds remaining");
                    if (time == 0) {
                        printToScreen(" ");
                    }
                }, //!<--ends timer function
                initialize: function() {
                    correct = 0;
                    wrong = 0;
                    timeout = 0;
                    arrayCycle = -1;
                    locked = false;
                    changeQuestion();
                    $(".button-wrap").toggleClass("hide");
                }
            } //!<--Ends gameMechanics branch of gameData object
        } //!<--ends the gameData object
        //arrayCycle is used to cycle through the top array and select elements from the gameData object
        //starts at -1 so when initialized it won't skip index 0 
    var arrayCycle = -1;
    //this stores the interval and timer 
    var timeControl;
    var time = 0;
    // variables for correct, incorrect, and timeouts
    var correct = 0;
    var wrong = 0;
    var timeout = 0;
    //locked prevents you from pressing the test button to generate new elements until you select an answer
    var locked = false;
    //test switch for problem solving, will be removed in final version
    //kept it in to control reset function
    $("#play").on("click", function() {
        gameData.gameMechanics.initialize()
    });
    //this function resets certain style changes and generates question text
    //also controls the end state and makes the play button reappear	
    function changeQuestion() {
        if (locked == false) { //<--prevents execution until locked is set back to false, not really needed since I hid the reset button
            clearInterval(timeControl);
            arrayCycle++;
            $("#print").html(" ");
            $("#print").css({ "font-size": "0px", "border-width": "0px" });
            $(".wrapping").css({ "background-image": "none" });
            gameData["gameMechanics"].timerCount();
            if (arrayCycle == currentQuestion.length) {
                $(".button-wrap").toggleClass("hide");
                $("#question-text").html("Game Over!");
                $("#newbuttons").html("Questions right : " + correct + "<br>" + "Questions wrong : " + wrong + "<br>" + "didn't guess at all : " + timeout + "<br>");
                $("#timer").html(" ").removeClass("time-display");
                clearInterval(timeControl);
            } else {
                create();
                $("#question-text").html(gameData[currentQuestion[arrayCycle]]["question"]);
            }
        } //<--ends (if locked is false) statement
    }; //<-- ends on click function

    //!this loop generates the buttons with the current question items
    function create() {
        locked = true;
        $("#newbuttons").html(" ");
        for (var i = 0; i < gameData[currentQuestion[arrayCycle]]["choices"].length; i++) {
            var controlBtn = $("<button>");
            controlBtn.addClass("select");
            controlBtn.attr("value", gameData[currentQuestion[arrayCycle]]["choices"][i]);
            controlBtn.text(gameData[currentQuestion[arrayCycle]]["choices"][i]);
            $("#newbuttons").append(controlBtn);
        }
        /*!scope issues were making on click disappear when a new set 
        of buttons were generated and adding this line fixed the issue*/
        $(".select").on("click", function() {
            printToScreen(this.value);
        });
    } //!<--ends the create function
    /*!This function compares the results to see if you got the answer right or not
    the parameter called button is equal to this.value of any created button */
    function printToScreen(button) {
        //these lines stop the timer, reset the css so the animation will work and apply the image
        locked = false;
        setTimeout(changeQuestion, 3000);
        $("#timer").html(" ").removeClass("time-display");
        $("#question-text").html(" ");
        $(".select").toggleClass("hide");
        clearInterval(timeControl);
        $("#print").css({ "font-size": "0px", "border-width": "0px" });
        $(".wrapping").css({ "background-image": gameData[currentQuestion[arrayCycle]]["image"] });
        $("#newbuttons").html("Correct Answer : " + gameData[currentQuestion[arrayCycle]]["correct"]);
        $("#print").animate({ fontSize: "70px", borderWidth: "8px" }, { duration: 800, easing: "swing" });
        //these lines check to see if your answer was correct or not
        if (button == gameData[currentQuestion[arrayCycle]]["correct"]) {
            $("#print").html("Good Job");
            correct++;
        } else if (time == 0) {
            $("#print").html("Time's Up");
            timeout++;
        } else {
            $("#print").html("Try Again!");
            wrong++;
        }
    }; //!<--ends the printToScreen function



















});
