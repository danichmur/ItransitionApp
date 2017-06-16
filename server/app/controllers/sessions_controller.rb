class SessionsController < ApplicationController
  
  def create
    user = User.where(email: params[:email]).first
    if user&.valid_password?(params[:password]) && user.email_confirmed?
      session[:user_id] = user.id
      render json: user.as_json(only: [:id, :authentication_token, :position]), status: :created
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
    session[:id] = nil
    render status: :ok
  end
end
