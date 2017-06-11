class ProjectController < ApplicationController
  
  def index
    render status: 200, json: Project.all.to_json
  end
  
  def show
    project = Project.find(params[:id])
    render status: 200, json: project.to_json
  end
  
  def project_params
    params.require(:project).permit(:id)
  end
end
