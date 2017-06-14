class Project < ApplicationRecord
    has_and_belongs_to_many :users
    has_and_belongs_to_many :tags
    has_many :discussions
    has_many :documents
end
