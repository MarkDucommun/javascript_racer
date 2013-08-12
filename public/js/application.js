$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  console.log("Starting...");
  $("iframe").hide();

  $(document).on('keyup', function(e){
     if (e.keyCode == 87){
       movePlayer('#player1_strip')
       console.log(" W WORKED");
     }

     if (e.keyCode == 38){
      movePlayer('#player2_strip')
      console.log("UP WORKED");
     }
  });
});

var movePlayer = function(player){

 //  if not then do this
  var active = (player + ' .active')
  var next = $(active).next();
  $(active).removeClass('active');
  $(next).addClass('active');

  gameFinished(player);
 // check to see if last cell of table is active

 // if yes then say player won
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
    $.post("/save", { player: player }, function(server_response){
      console.log(arguments)
      console.log("Server response " + server_response);
    });
    // window.location.href = '/'
  }, 1000)
};

var gameFinished = function(player){
  var last_cell = (player + ' td:last-child')
  
  if ($(last_cell).hasClass('active')){
    playerWon(player);
    console.log(player + ' won!');
    $(document).unbind('keyup');
  }
};
