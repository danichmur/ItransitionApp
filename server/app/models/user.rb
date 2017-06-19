class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_token_authenticatable
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  has_and_belongs_to_many :projects
  
  def self.on_project(users_params)
    project = Project.find(users_params[:project_id])
    users = []
    users_params[:users].each do |user|
      users << User.find(user)
    end
    project.users = users
  end
  
  def self.registration(registrations_params)
    user = User.new(registrations_params)
    @user = user
    UserMailer.confirmation_email(@user).deliver_now
    begin
      user.save
    rescue
      return {message: "Nickname has already been taken"}, status: 406
    end
    if user.id
      return {user_saved: "ok"}, status: 200
    else
      return {message: "Email has already been taken"}, status: 406
    end
  end
end
