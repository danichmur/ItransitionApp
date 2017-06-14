class ProjectsController < ApplicationController
  
  def index
    render status: 200, json: Project.all.to_json(:include => 
      {:tags => 
          {:only => [:value, :id]}
        }
    )
  end
  
  def show
    project = Project.find(params[:id])
    render status: 200, json: project.to_json(:include => {
      :six_users => 
        { :only => [:nickname, :id]},
      :tags => 
        {:only => [:value, :id]},
      :documents => 
        {:only => [:name, :url]},
      :discussions =>
        {:only => [:id, :name]}
      }
    )
  end
  
  def users
    project = Project.find(params[:project_id])
    render status: 200, json: project.users.
      to_json(:only => [:name, :nickname, :email, :position, :photo])
  end
  
  def project_params
    params.require(:project).permit(:id)
  end
end
