get '/' do
  erb :index
end

get '/game' do

  erb :board
end

post '/start' do
  @game = Game.new
  @game.players << Player.find_or_create_by_name(params[:player_1])
  @game.players << Player.find_or_create_by_name(params[:player_2])  
  @game.save
  redirect('/game')
end

post '/save' do
  puts "this is the winner #{params[:player]}"
  if params[:player] == "#player1_strip"
    game = Game.last.update_attributes(winner: Game.last.players[0].id.to_s)
  else
    game = Game.last.update_attributes(winner: Game.last.players[1].id.to_s)
  end
end