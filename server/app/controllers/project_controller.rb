class ProjectController < ApplicationController
  
  def index
    render status: 200, json: Project.all.to_json
  end
  
  def create
    project = Project.find(event_params)
    render status: 200, json: project.to_json
  end
  
  def event_params
    params.require(:project).permit(:id, :name, :author, :description, :active)
  end
end
