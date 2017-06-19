class ProjectsController < ApplicationController
  before_action :find_project, only: [:update, :show, :destroy]
  
  def index
    render status: 200, json: Project.all_in_json
  end
  
  def limit_index
    render status: 200, json: Project.limit_in_json
  end
  
  def create
    project = Project.new_project(project_params)
    render json: {id: project.id, created_at: project.created_at}, status: 200
  end
  
  def update
    if @project.update(project_params)
      Project.add_news("Project #{@project.name} updated!", @project, params[:user_id])
      render json: {status: :ok}
    else 
      render json: {status: :unprocessable_entity}
    end
  end

  def show
    render status: 200, json: @project.to_json(:include => 
      {
        users:       {only: [:nickname, :id, :photo]},
        tags:        {only: [:value, :id]},
        documents:   {only: [:id, :name, :url, :updated_at]},
        discussions: {only: [:id, :name, :updated_at]}
      }
    )
  end
  
  def destroy
     Project.add_news("Project #{@project.name} deleted!", @project, params[:user_id])
     @project.delete
     render json: {status: :ok}
  end
  
  def users
    project = Project.find(params[:project_id])
    render status: 200, json: project.users.
      to_json(only: [:id, :name, :nickname, :email, :position, :photo])
  end
    
  def find_project
    @project = Project.find(params[:id])
  end
  
  def project_params
    params.require(:project).permit(:name, :active, :description, :author)
  end
end