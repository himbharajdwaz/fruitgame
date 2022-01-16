var playing = false;
var score;
var trailsleft;
var  Step;
var action;  // used for set interval
var fruits = ['apple' , 'banana', 'beeries', 'cherry', 'grapes', 'mango', 'orange', 'pineapple'];
$(function(){

    // click on start reset button
    $("#startreset").click(function(){
    //  we are playing

    if(playing == true){
        // reload page
        location.reload();
    }
    else{

        // we are not playing 
        playing = true;
        // game initiated

        // set score to 0
        score = 0;
        $("#scorevalue").html(score);

        // show trail left
        $("#trailsleft").show();
        trailsleft = 3;
       addHearts();

    //    hide game over box
      $("#gameover").hide();

       // change button text to "reset game"
       $("#startreset").html("Reset Game");

    //    start sending fruits
    startAction();
    }
    });

// slice  a fruit
$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score);
    // update score
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();

    // stop fruit and hide it
    clearInterval(action);
    
    
    // hide fruits
    $("#fruit1").hide("explode", 500);
    // slice fruit

    //   send new fruit
    setTimeout(startAction, 500);
});
// function
function addHearts(){
    $("#trailsleft").empty();
    for(i = 0; i < trailsleft; i++){
        $("#trailsleft").append('<img src= "images/Heart.png" class ="life">');
    }
}

//    start sending fruits

function startAction(){

//    generate a fruit
   $("#fruit1").show();
   chooseFruit();
//    choose a random fruit
$("#fruit1").css({'left' :  Math.round(550*Math.random()) , 'top' : -50});
// random position

    // generate a random step
    step = 1+ Math.round(5*Math.random());
    // change step

    // move fruits  down one step every 10 sec
    action = setInterval(function(){
        
        //    move fruit by one step
        $("#fruit1").css('top', $("#fruit1").position().top  +  step);

        //   check if the fruit is too low
        if($("#fruit1").position().top > $("#fruitsContainer").height()){
        //   check if we have any trails left
             if(trailsleft > 1){
                //   generate a fruit
                $("#fruit1").show();
                chooseFruit();
             //    choose a random fruit
             $("#fruit1").css({'left' :  Math.round(550*Math.random()) , 'top' : -50});
             // random position
             
                 // generate a random step
                 step = 1+ Math.round(5*Math.random());
                 // change step 

                //  reduce trails by one
                trailsleft --;

                // populate trails left box
                addHearts();
             }

             else{
                //  game over
                  playing = false;
                //   we are not playing anymore
                $("#startresrt").html("Start Game");
                // change button to start game
                  $("#gameover").show();
                  $("#gameover").html(' <p>Game Overr! </p> <p>Your Score Is ' + score  + ' </p> ')
                  $("#trailsleft").hide();
                   stopAction();
             }
        }
    }, 10);
}

// generate a random fruit
function chooseFruit(){
    $("#fruit1").attr('src' , 'images/' +  fruits[Math.round(8*Math.random())] +'.png');
}

// stop dropping fruits

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});
