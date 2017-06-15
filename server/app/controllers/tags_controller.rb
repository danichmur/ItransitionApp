class TagsController < ApplicationController
  def index
    render status: 200, json: 
      Tag.all.to_json(:only => [:value, :id])
  end
  
  def update
  end
  
  def tags_on_project
    Tag.update_tags(tags_params)
    render status: :ok
  end
  
  def tags_params
    params.permit(:project_id, tags:[])
  end
end
