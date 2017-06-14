class User < ApplicationRecord
  has_and_belongs_to_many :projects
  
  def six_users 
    users_measurements.limit(6) 
  end
end
