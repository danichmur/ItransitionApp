class Discussion < ApplicationRecord
  belongs_to :project
  has_many :comments
  
  def self.on_project(discussions_params)
    hash = discussions_params
    project = Project.find(hash[:project_id])
    if(hash[:id] == -1)
      d = Discussion.create(name: hash[:name])
      project.discussions << d
    else
      project.discussions.delete(hash[:id])
    end
  end
end
