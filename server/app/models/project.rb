class Project < ApplicationRecord
    has_and_belongs_to_many :users
    has_and_belongs_to_many :tags
    has_many :discussions
    has_many :documents
    
    def self.add_news(header, project, user_id)
      News.create(header: header, body: project.description, author: user_id)
    end
end
