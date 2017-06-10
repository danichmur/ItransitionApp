class ProjectController < ApplicationController
  
  def index
    render status: 200, json: Project.all.to_json
  end 
end
