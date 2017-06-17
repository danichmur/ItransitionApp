class Discussion < ApplicationRecord
  belongs_to :project
  has_many :comments
  
  def self.on_project(discussions_params)
    hash = discussions_params
      project = Project.find(hash[:project_id])
    if(hash[:id].to_i == -1)
      discussion = Discussion.new(name: hash[:name])
      project.discussions << discussion
      return discussion
    else
      project.discussions.delete(hash[:id])
      return nil
    end
  end
end
