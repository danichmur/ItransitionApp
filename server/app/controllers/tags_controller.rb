class TagsController < ApplicationController
  def index
    render status: 200, json: 
      Tag.all.to_json(:only => [:value, :id])
  end
  
  def create
    tags = Tag.update_tags(tags_params)
    render status: 200, json: tags.to_json(:only => [:value, :id])
  end
  
  def projects
    tag = Tag.eager_load(:projects).find(params[:tag_id])
    render status: 200, json: 
      tag.projects.to_json(
        include: {:tags => {only: [:id, :value]}})
  end
  
  def tags_on_project
    Tag.update_tags(tags_params)
    render status: :ok
  end
  
  def tags_params
    params.permit(:project_id, tags:[])
  end
end
