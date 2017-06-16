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
end
