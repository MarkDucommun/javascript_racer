var player1 = Array(49,50,51,52,53,
                    81,87,69,82,84,
                    65,83,68,70,71,
                    90,88,67,86,66)

var player2 = Array(55,56,57,
                    89,85,73,79,80,
                    72,74,75,76,
                    78,77)

keystroke1 = 65;
keystroke2 = 74;

start = -1;

endOne = -1;
endTwo = -1;

oneDone = false;
twoDone = false;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  console.log("Starting...");  

  setTimeout(function(){
    
    $('#countdown').html("2")
    setTimeout(function(){
    
    $('#countdown').html("1")
    setTimeout(function(){
    
    $('#countdown').html("Go")
    
    start =  new Date().getTime() / 1000;
    console.log(start)
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
});

var movePlayer = function(player){

  var active = (player + ' .active')
  var next = $(active).next();
  $(active).removeClass('active');
  $(next).addClass('active');
};

var playerOneStuff = function(){
  
  playerFinished('#player1_strip');
  
  if(oneDone == false){
    console.log(new Date().getTime())
    movePlayer('#player1_strip');
    keystroke1 = player1[Math.floor(Math.random()*player1.length)];
    $('#player1').html(String.fromCharCode(keystroke1));
  } 


};

var playerTwoStuff = function(){

  playerFinished('#player2_strip');
  
  if(twoDone == false){
    console.log(new Date().getTime())
    movePlayer('#player2_strip');
    keystroke2 = player2[Math.floor(Math.random()*player2.length)];
    $('#player2').html(String.fromCharCode(keystroke2));
  }
}

var playerFinished = function(player){
  
  var last_cell = (player + ' td:last-child')
  console.log(player == "#player1_strip")
  if ($(last_cell).hasClass('active')){
    
    if(player == "#player1_strip"){
      oneDone = true;
      endOne =  new Date().getTime() / 1000;
      console.log(endOne - start);
      $('#player1').html(endOne - start)
    }
    else{
      twoDone = true;
      endTwo =  new Date().getTime() / 1000;
      console.log(endTwo - start);
      $('#player2').html((endTwo - start));
    }
    $.post("/save", { player: player });
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
  $('.wrapper').append('<iframe style="position: absolute" width="100%" height="100%" src="//www.youtube.com/embed/Kdgt1ZHkvnM?start=' + start + '&end=' + end + '&autoplay=1"  frameborder="0" allowfullscreen></iframe>')
  setTimeout(function(){
    window.location.href = '/'
  }, 16000)
  }
}