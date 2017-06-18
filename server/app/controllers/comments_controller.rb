class CommentsController < ApplicationController
  before_action :find_comments
  
  def index
    render status: 200, json: @comments.to_json()
  end
  
  def create 
    c = Comment.new(body: params[:body], user_id: params[:user_id])
    @comments << c
    render json: {:id => c.id, 
      :updated_at => c.updated_at}, status: 200
  end
  
  def find_comments
    @comments = Project.find(params[:project_id]).
      discussions.find(params[:discussion_id]).comments
  end
end
