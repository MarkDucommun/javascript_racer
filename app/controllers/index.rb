get '/' do
  # let user create new short URL, display a list of shortened URLs
  @urls = Url.all
  @display = "_front_page"
  erb :index
end