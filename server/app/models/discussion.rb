class Discussion < ApplicationRecord
  belongs_to :project
  has_many :comments
end
