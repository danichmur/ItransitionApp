class UsersController < ApplicationController
  
  
  def index
    render status: 200, json: User.all.to_json(:only => [:id, :name, :nickname, :email, :position, :photo])
  end
  
  def show
    user = User.find(params[:id])
    render status: 200, json: user.to_json
  end
  
end
