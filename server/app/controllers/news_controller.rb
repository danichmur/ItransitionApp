class NewsController < ApplicationController
  def index
    render status: 200, json: News.all.to_json
  end
  
  def show
    news = News.find(params[:id])
    render status: 200, json: news.to_json
  end
  
end
