class NewsController < ApplicationController
  def index
    render status: 200, json: News.order(created_at: :desc).to_json
  end
  
  def limit_index
   render status: 200, json: News.order(created_at: :desc).limit(10).to_json
  end
  
  def show
    news = News.find(params[:id])
    render status: 200, json: news.to_json
  end
  
end
