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
    render status: 200, json: project.to_json(:include => 
      {:users => 
          { :only => [:name, :id]},
       :tags => 
          {:only => [:value, :id]}
        }
    )
    
  end
  
  def project_params
    params.require(:project).permit(:id)
  end
end
