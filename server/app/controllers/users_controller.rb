class UsersController < ApplicationController
  
  def index
    render status: 200, json: 
    User.all.to_json(:except => [:password, :created_at, :updated_at])
  end

  def create
    render json: User.registration(registrations_params)
  end
  
  def update
    user = User.find(params[:id])
    if user.update(user_update_params)
      render json: {status: :ok}
    else 
      render json: {status: :unprocessable_entity}
    end
  end
  
  def show
    user = User.eager_load(:projects).find(params[:id])
    render status: 200, json: user.to_json(:except => :password, 
      include: {:projects => {include: :tags}})
  end
  
  def confirm_email
    if $email_code == params[:email_code]
      User.where(email: params[:email]).update(email_confirmed: true)
      render json: {:message => "Email confirmed"}, status: 200
    else
      render json: {:message => "Incorrect code"}, status: 406
    end
  end

  def users_on_project
    User.on_project(users_params)
    render status: :ok
  end
  
  def user_update_params
    params.require(:user).permit(:photo, :position, :name, :nickname)
  end
    
  def users_params
    params.permit(:project_id, users:[])
  end
  
  def registrations_params
    params.permit(:email, :password, :password_confirmation, :name, :nickname)
  end
end
