class UsersController < ApplicationController
  
  def index
    render status: 200, json: 
      User.all.to_json(:except => [:password, :created_at, :updated_at])
  end

  def create
    render json: User.registration(registrations_params)
  end
  
  def show
    user = User.find(params[:id])
    render status: 200, json: user.to_json(:except => :password)
  end
  
  def confirm_email
    if $email_code == params[:email_code]
      User.where(email: params[:email]).update(email_confirmed: true)
      render json: {:message => "Email confirmed"}, status: 200
    else
      render json: {:message => "Incorrect code"}, status: 406
    end
  end
  
  def sign_up
    user = User.find(1)
    render json: user.as_json
  end
  
  def users_on_project
    User.on_project(users_params)
    render status: :ok
  end
  
  def users_params
    params.permit(:project_id, users:[])
  end
  
  def registrations_params
    params.permit(:email, :password, :password_confirmation, :name, :nickname)
  end
end
