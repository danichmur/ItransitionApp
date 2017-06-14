class TagsController < ApplicationController
  def index
    render status: 200, json: Tag.all.to_json(:only => [:value, :id])
  end
  
  def update
  end
  
  def tags_on_project
    project = Project.find(params[:project_id])
    
    if  project.tags.update(tags_params)
      render status: :ok
    else 
      render status: :unprocessable_entity
    end
  end
  
  def tags_params
    params.permit(tags: [[:id, :value]])
  end
  
end
