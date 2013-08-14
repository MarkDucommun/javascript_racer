var keys_for_one = Array(49,50,51,52,53,
                         81,87,69,82,84,
                         65,83,68,70,71,
                         90,88,67,86,66);

var keys_for_two = Array(55,56,57,48,189,
                         89,85,73,79,80,
                         72,74,75,76,186,
                         78,77,188,190,191);

// var render_key = function(keycode, element)
// {
//   if(keycode == 189){
//       return "-";
//     }
//     else if(keycode == 186){
//       return ";";
//     }
//     else if(keycode == 188){
//       return ",";
//     }
//     else if(keycode == 190){
//       return ".";
//     }
//     else if(keycode == 191){
//       return "/";
//     }
//     else if(keycode == 48){
//       return "Zero";
//     }
//     else{
//       return String.fromCharCode(keystroke2);
//     }
// };

function Player(name, valid_keys, key_id, track_id){
  this.name = name;
  this.valid_keys = valid_keys;
  this.key_id = key_id;
  this.track_id = track_id;
  this.finished = false;
};

Player.prototype.refresh_key = function(){
  this.new_key();
  this.render_key();
}

Player.prototype.new_key = function(){
  this.current_key = this.valid_keys[Math.floor(Math.random()*this.valid_keys.length)];
};

Player.prototype.render_key = function(){
  $(this.key_id).html(String.fromCharCode(this.current_key));
};

Player.prototype.move = function(){
  var active = (this.track_id + ' .active');
  var next = $(active).next();
  $(active).removeClass('active');
  $(next).addClass('active');
};

Player.prototype.check_if_finished = function(){
  var last_child = this.track_id + ' td:last-child';

  if ( $(last_child).hasClass('active') == true){
    this.finished = true;
    var elapsed = (new Date().getTime() / 1000) - this.start;
    $(this.key_id).html(elapsed);
    $.post('/save', {player: this.name, time: elapsed});
  };

  gameFinished();
};

Player.prototype.start_time = function(start){
  this.start = start;
};

$(document).ready(function() {

  var gameId = $('board').data('game-id');
  var playerOneId = $('board').data('player1-id');
  var playerTwoId = $('board').data('player2-id');
  
  player1 = new Player("1", keys_for_one, "#player1", "#player1_strip");
  player2 = new Player("2", keys_for_two, "#player2", "#player2_strip");

  $('#startButton').on('submit', startGame);
});

var startGame = function(event){
  event.preventDefault();
  $('.container').hide();
  $.post('/start', $('#startButton').serialize(), onSuccess);
};

var onSuccess = function(success){
  $('.wrapper').append(success);
  countdown();
};

var go = function(){
     
  player1.refresh_key();

  player2.refresh_key();

  var start_time =  new Date().getTime() / 1000;

  player1.start_time(start_time);
  player2.start_time(start_time);

  $(document).on('keyup', function(e){
    
    if (e.keyCode == player1.current_key){
      player1.check_if_finished();

      if(player1.finished == false){
        player1.move();
        player1.refresh_key();
      }
    }

    if (e.keyCode == player2.current_key){
      player2.check_if_finished();

      if(player2.finished == false){
        player2.move();
        player2.refresh_key();
      }
    }
  });
};

var countdown = function(){
  setTimeout(function(){
    
    $('#countdown').html("2")
    setTimeout(function(){
    
      $('#countdown').html("1")
      setTimeout(function(){
      
        $('#countdown').html("Go");
        go();

      }, 1000);
    }, 1000);
  }, 1000);
};

var gameFinished = function(){
  if(player1.finished == true && player2.finished == true){
    
    $(document).unbind('keyup');
    var clip_start = Math.floor(8 + Math.random()*1185)
    var clip_end = clip_start + 15
    $.post("/get_winner")
    
    setTimeout(function(){
      
      $('.board').hide();
      $('.wrapper').append('<iframe style="position: absolute" width="100%" height="100%" src="//www.youtube.com/embed/Kdgt1ZHkvnM?start=' + clip_start + '&end=' + clip_end + '&autoplay=1"  frameborder="0" allowfullscreen></iframe>');
      
      setTimeout(function(){
      
        $('iframe').remove();
        $
      }, 16000)  
    }, 1000)
  }
};

