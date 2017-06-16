class SessionsController < ApplicationController
  
  def create
    user = User.where(email: params[:email]).first
    if user&.valid_password?(params[:password])
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :email, :authentication_token]), status: :created
    else
      head(:unauthorized)
    end
  end
  
  def check
    if User.find_by(authentication_token: params[:authentication_token])
      render json: {:status => 'ok'}
    else
      head(:unauthorized)
    end
  end
  
  def destroy
    session[:user_id] = nil
  end
end
