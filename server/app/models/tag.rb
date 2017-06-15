class Tag < ApplicationRecord
  has_and_belongs_to_many :projects
  
  def self.update_tags(tags_params)
    tags = []
    project = Project.find(tags_params[:project_id])
    tags_params[:tags].each do |tag|
      if(Tag.exists?(value: tag))
        tags << Tag.find_by(value: tag)
      else
        tags << Tag.create(value: tag)
      end 
    end
    project.tags = tags
  end
end
