class Project < ApplicationRecord
    has_and_belongs_to_many :users
    has_and_belongs_to_many :tags
    has_many :discussions
    has_many :documents
    
    def self.add_news(header, project, user_id)
      News.create(header: header, body: project.description, author: user_id)
    end
    
    def self.all_in_json
      Project.eager_load(:tags).order(created_at: :desc).to_json(include: {
          tags: {only: [:value, :id]}
        }
      )
    end
    
    def self.limit_in_json
      Project.where(active: true).eager_load(:tags).limit(10).to_json(include: {
          tags: {only: [:value, :id]
            }
          }
        )
    end
    
    def self.new_project(project_params)
      project = Project.create(project_params)
      Project.add_news("Project #{project.name} created!", project, project_params[:author])
      return project
    end
    
    
end
