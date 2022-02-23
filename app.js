$("document").ready(function () {

    //Variables
    let sentences = [
        'ten ate neite ate nee enet ite ate inet ent eate',
        'Too ato too nOt enot one totA not anot tOO aNot',
        'oat itain oat tain nate eate tea anne inant nean',
        'itant eate anot eat nato inate eat anot tain eat',
        'nee ene ate ite tent tiet ent ine ene ete ene ate'
    ];
    sentenceCount = 0;
    letterCount = 0;
    let rightCount = 0;
    let wrongCount = 0;
    let startTime = 0;
    let endTime = 0;
    let timeDiff = 0;
    let currentTime = 0;
    let timer = 0;
    let block = $("<span></span>");
    let firstString = 0;
    let lastString = 0;
    let button1 = $("<button id='resetBtn'>Yes</button>")
    let button2 = $("<button>No</button>")
    yellowBlock();
    $("#target-letter").append("'" + sentences[sentenceCount].charAt(letterCount) + "'");
    start();

    //Swapping between keyboards when shift is pressed
    $("#keyboard-upper-container").hide();
    $(document).keydown(function (e) {
        if (e.which == 16) {
            $("#keyboard-lower-container").hide();
            $("#keyboard-upper-container").show();
        }
    })

    $(document).keyup(function (e) {
        if (e.which == 16) {
            $("#keyboard-lower-container").show();
            $("#keyboard-upper-container").hide();
        }
    })

    //Typing
    $(document).keypress(function (event) {
        if (letterCount < sentences[sentenceCount].length) {
            if (event.key == sentences[sentenceCount].charAt(letterCount)) {
                letterCount++;
                yellowBlock();

                //target letter
                $("#target-letter").empty();
                $("#target-letter").append("'" + sentences[sentenceCount].charAt(letterCount) + "'");

                //check mark
                let check = $("<span></span");
                check.html('&#10004;');
                check.css("color", "#1DA237")
                $("#feedback").append(check);
                rightCount++;
            } else {
                //red X
                let wrong = $("<span></span>")
                wrong.text("X");
                wrong.css("color", "#CD2626");
                $("#feedback").append(wrong);
                wrongCount++;
            }
        } else {
            //Win condition
            if (sentenceCount == (sentences.length - 1)) {
                end();
                let finalScore = (54 / timeDiff) - (2 * wrongCount);
                finalScore = Math.floor(finalScore * 100) / 100;
                $("#target-letter").empty();
                $("#target-letter").append("'Your score: " + finalScore + "'");
            } else {
                sentenceCount++;
                letterCount = 0;
                yellowBlock();
                $("#target-letter").empty();
                $("#target-letter").append("'" + sentences[sentenceCount].charAt(letterCount) + "'");
                $("#feedback").empty();
            }
        }
    })

    //Yellow Block
    function yellowBlock() {
        firstString = sentences[sentenceCount].slice(0, letterCount)
        lastString = sentences[sentenceCount].slice((letterCount + 1), sentences[sentenceCount].length);
        $(sentence).empty();
        $(block).empty();
        $(block).css("background-color", "yellow");
        $(block).append(sentences[sentenceCount].charAt(letterCount));
        $(sentence).append(firstString);
        $(sentence).append(block);
        $(sentence).append(lastString);
    }

    //Highlighting keys when pressed
    $(document).keypress(function (e) {
        let keyPressed = e.which;
        switch (keyPressed) {
            case keyPressed:
                $(`#${keyPressed}`).css("background-color", "yellow");
                setTimeout(function () {
                    $(`#${keyPressed}`).css("background-color", "");
                }, 100);
                break;
        }
    })

    //Getting time
    function start() {
        startTime = new Date();
    };

    function end() {
        endTime = new Date();
        timeDiff = endTime - startTime;
        timeDiff /= 60000;
        clearInterval(startTimer);
        setTimeout(function () {
            $(".keyboard-container").css("margin-top", "225px");
            $("#target-button").append("Play again? ");
            $("#target-button").append(button1);
            $("#target-button").append(button2);
        }, 1000);
    }

    //Playing around with timers
    var startTimer = setInterval(myTimer, 100);

    function myTimer() {
        currentTime = new Date();
        timer = Math.floor((currentTime - startTime) / 1000);
        $("#target-timer").empty();
        $("#target-timer").append("Time: " + timer);
    }

    $(button1).on('click', function () {
        sentenceCount = 0;
        letterCount = 0;
        rightCount = 0;
        wrongCount = 0;
        startTime = 0;
        endTime = 0;
        timeDiff = 0;
        currentTime = 0;
        timer = 0;
        firstString = 0;
        lastString = 0;
        yellowBlock();
        $("#target-letter").empty();
        $("#target-letter").append("'" + sentences[sentenceCount].charAt(letterCount) + "'");
        $("#feedback").empty();
        $("#target-button").empty();
        $(".keyboard-container").css("margin-top", "200px");
        start();
        startTimer = setInterval(myTimer, 100);
    })
})