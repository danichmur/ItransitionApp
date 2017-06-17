class Discussion < ApplicationRecord
  belongs_to :project
  has_many :comments
  
  def self.on_project(dis_params)
    project = Project.find(dis_params[:project_id])
    discussion = Discussion.new(name: dis_params[:name])
    project.discussions << discussion
    return discussion
  end
end
