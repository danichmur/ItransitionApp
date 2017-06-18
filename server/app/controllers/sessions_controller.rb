class SessionsController < ApplicationController
  
  def create
    user = User.where(email: params[:email]).first
    p user.authentication_token
    if user&.valid_password?(params[:password]) && user.email_confirmed?
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :authentication_token, :position]), status: :created
    else
      head(:unauthorized)
    end
  end
  
  def check
    user = User.find_by(authentication_token: params[:authentication_token])
    if user
      render json: user.as_json(only: [:id, :position, :name, :photo]), status: :ok
    else
      head(:unauthorized)
    end
  end
  
  def destroy
    session[:id] = nil
    render status: :ok
  end
end
