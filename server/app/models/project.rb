class Project < ApplicationRecord
    has_and_belongs_to_many :users
    has_and_belongs_to_many :tags
    has_many :discussions
    has_many :documents
    has_and_belongs_to_many :six_users, lambda { limit(6) }, class_name: 'User'
end
