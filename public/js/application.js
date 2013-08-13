var player1 = Array(49,50,51,52,53,
                    81,87,69,82,84,
                    65,83,68,70,71,
                    90,88,67,86,66)

var player2 = Array(55,56,57,48,189,
                    89,85,73,79,80,
                    72,74,75,76,186,
                    78,77,188,190,191)

var keystroke1 = 65;
var keystroke2 = 74;

start = -1;

endOne = -1;
endTwo = -1;

oneDone = false;
twoDone = false;

$(document).ready(function() {

  var gameId = $('board').data('game-id');
  var playerOneId = $('board').data('player1-id');
  var playerTwoId = $('board').data('player2-id');
  
  $('#startButton').on('submit', startGame);
});

var countdown = function(){
  setTimeout(function(){
    
    $('#countdown').html("2")
    setTimeout(function(){
    
      $('#countdown').html("1")
      setTimeout(function(){
      
        $('#countdown').html("Go")
        
        keystroke1 = player1[Math.floor(Math.random()*player1.length)];
        $('#player1').html(String.fromCharCode(keystroke1));

        keystroke2 = player2[Math.floor(Math.random()*player2.length)];
        $('#player2').html(String.fromCharCode(keystroke2));

        start =  new Date().getTime() / 1000;

        $(document).on('keyup', function(e){
          
          if (e.keyCode == keystroke1){
            playerOneStuff();
          }

          if (e.keyCode == keystroke2){
            playerTwoStuff();
          }
        });
      }, 1000)
    }, 1000)
  }, 1000)
}

var startGame = function(event){
  event.preventDefault();
  $('.container').hide();
  $.post('/start', $('#startButton').serialize(), onSuccess)
};

var onSuccess = function(success){
  $('.wrapper').append(success);
  countdown();
}

var movePlayer = function(player){

  var active = (player + ' .active')
  var next = $(active).next();
  $(active).removeClass('active');
  $(next).addClass('active');
};

var playerOneStuff = function(){
  
  playerFinished('#player1_strip');
  
  if(oneDone == false){
    movePlayer('#player1_strip');
    keystroke1 = player1[Math.floor(Math.random()*player1.length)];
    $('#player1').html(String.fromCharCode(keystroke1));
  } 
};

var playerTwoStuff = function(){

  playerFinished('#player2_strip');
  
  if(twoDone == false){
    movePlayer('#player2_strip');
    keystroke2 = player2[Math.floor(Math.random()*player2.length)];
    if(keystroke2 == 189){
      $('#player2').html("-");
    }
    else if(keystroke2 == 186){
      $('#player2').html(";");
    }
    else if(keystroke2 == 188){
      $('#player2').html(",");
    }
    else if(keystroke2 == 190){
      $('#player2').html(".");
    }
    else if(keystroke2 == 191){
      $('#player2').html("/");
    }
    else if(keystroke2 == 48){
      $('#player2').html("Zero");
    }
    else{
      $('#player2').html(String.fromCharCode(keystroke2));
    }
  }
}

var playerFinished = function(player){
  
  var last_cell = (player + ' td:last-child')
  console.log(player == "#player1_strip")
  if ($(last_cell).hasClass('active')){
    
    if(player == "#player1_strip"){
      oneDone = true;
      endOne =  new Date().getTime() / 1000;
      $('#player1').html(endOne - start)
      $.post("/save", { player: 1, time: (endOne - start) });
    }
    else{
      twoDone = true;
      endTwo =  new Date().getTime() / 1000;
      $('#player2').html(endTwo - start);
      $.post("/save", { player: 2, time: (endTwo - start) });
    }
  }
  gameFinished();
};

var gameFinished = function(){
  if(oneDone == true && twoDone == true){
    $(document).unbind('keyup');
    $('.racer_table').hide();
  $('iframe').show();
  var start = Math.floor(8 + Math.random()*1185)
  var end = start + 15
  console.log(start);
  $.post("/get_winner")
  setTimeout(function(){
    $('.wrapper').append('<iframe style="position: absolute" width="100%" height="100%" src="//www.youtube.com/embed/Kdgt1ZHkvnM?start=' + start + '&end=' + end + '&autoplay=1"  frameborder="0" allowfullscreen></iframe>');
    $('.board').hide();
    setTimeout(function(){
      $('.container').show();
      $('iframe').remove();
  }, 16000)  
  }, 1000)
  }
}
