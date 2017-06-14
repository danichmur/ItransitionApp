class ProjectsController < ApplicationController
   before_action :find_project, only: [:update, :show]
  def index
    render status: 200, json: Project.all.to_json(:include => 
      {:tags => 
          {:only => [:value, :id]}
        }
    )
  end
  
  def update
   # redirect_to :controller => 'tags', :action => 'update'
  #  p "USERS", params[:project][:users]
  #  p "DOC", params[:project][:documents]
  #  p "DIS", params[:project][:discussions]
    
    if @project.update(project_params)
      render status: :ok
    else 
      render status: :unprocessable_entity
    end
  end
  
  def show
    render status: 200, json: @project.to_json(:include => {
      :users => 
        {:only => [:nickname, :id, :photo]},
      :tags => 
        {:only => [:value, :id]},
      :documents => 
        {:only => [:id, :name, :url]},
      :discussions =>
        {:only => [:id, :name]}
      }
    )
  end
  
  def users
    project = Project.find(params[:project_id])
    render status: 200, json: project.users.
      to_json(:only => [:id, :name, :nickname, :email, :position, :photo])
  end
    
  def find_project
    @project = Project.find(params[:id])
  end
  
  def project_params
    params.require(:project).permit(:name, :active, :description)
  end
end