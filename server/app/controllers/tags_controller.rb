class TagsController < ApplicationController
  def index
    render status: 200, json: Tag.all.to_json(:only => [:value, :id])
  end
  
  def update
  end
  
  def tags_on_project
    project = Project.find(params[:project_id])
    hash = tags_params
    hash = JSON.parse(hash) if hash.is_a?(String)
    project.tags.clear
    hash[:tags].each do |tag|
      if(Tag.exists?(value: tag[:value]) != true)
        t = Tag.create(value: tag[:value])
        project.tags << t
      else
        project.tags << Tag.find_by(value: tag[:value])
      end 
    end
    render status: :ok
  end
  
  def tags_params
    params.permit(tags: [[:id, :value]])
  end
  
end
