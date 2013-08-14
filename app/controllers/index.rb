get '/' do
  @foos = Foo.order(:time).limit(10)
  erb :index
end

get '/game' do
  erb :board
end

post '/start' do
  @game = Game.new
  @player1 = Player.find_or_create_by_name(params[:player_1])
  @player2 = Player.find_or_create_by_name(params[:player_2])  
  @game.players << @player1
  @game.players << @player2
  @game.save

  erb :board, layout: false
end

post '/save' do
  if params[:player] == "1"
    Game.last.foos.first.update_attributes(time: params[:time])
  else
    Game.last.foos.last.update_attributes(time: params[:time])
  end
end

post '/get_winner' do
  Game.set_last_winner
end
