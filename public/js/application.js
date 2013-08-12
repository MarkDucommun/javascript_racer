var player1 = Array(49,50,51,52,53,54,65,68,83,87,81,69)
var player2 = Array(55,56,57,48,109,89,85,73,79,80,74,75,76)
var keystroke1 = 65;
var keystroke2 = 73;

finished = false;

$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  console.log("Starting...");  

  setTimeout(function(){
    
    $('#countdown').html("2")
    setTimeout(function(){
    
    $('#countdown').html("3")
    setTimeout(function(){
    
    $('#countdown').html("Go")
    $(document).on('keyup', function(e){
      if (e.keyCode == keystroke1){
        movePlayer('#player1_strip')
        console.log(" W WORKED");
      }

      if (e.keyCode == keystroke2){
        movePlayer('#player2_strip')
        console.log("UP WORKED");
      }
  });
  }, 1000)
  }, 1000)
  }, 1000)
});

var movePlayer = function(player){

 //  if not then do this
  var active = (player + ' .active')
  var next = $(active).next();
  $(active).removeClass('active');
  $(next).addClass('active');

 // check to see if last cell of table is active
  keystroke1 = player1[Math.floor(Math.random()*player1.length)];
  $('#player1').html(String.fromCharCode(keystroke1));
  
  keystroke2 = player2[Math.floor(Math.random()*player2.length)];
  $('#player2').html(String.fromCharCode(keystroke2));
 // if yes then say player won
  gameFinished(player);
};

var playerWon = function(player){
  $('.racer_table').hide();
  $('iframe').show();
  var start = Math.floor(8 + Math.random()*1185)
  var end = start + 15
  console.log(start);
  $('.wrapper').append('<iframe style="position: absolute" width="100%" height="100%" src="//www.youtube.com/embed/Kdgt1ZHkvnM?start=' + start + '&end=' + end + '&autoplay=1"  frameborder="0" allowfullscreen></iframe>')
  setTimeout(function(){
    console.log(player);
    $.post("/save", { player: player });
    window.location.href = '/'
  }, 16000)
};

var gameFinished = function(player){
  var last_cell = (player + ' td:last-child')
  
  if ($(last_cell).hasClass('active')){
    finished = true;
    playerWon(player);
    console.log(player + ' won!');
    $(document).unbind('keyup');
  }
};
