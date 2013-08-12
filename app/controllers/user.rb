get '/sign_up' do
  @display = "_sign_up"
  erb :index
end

get '/sign_out' do
  session.clear
  redirect ('/')
end

post '/sign_in' do
  @user = User.authenticate(params[:email], params[:password])
  session[:user_id] = @user.id
  redirect('/')
end

post '/sign_up' do
  @user = User.new(params[:user])
  @user.save!
  redirect('/')
end