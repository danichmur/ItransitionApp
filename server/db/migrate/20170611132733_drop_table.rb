class DropTable < ActiveRecord::Migration[5.1]
  def change
    drop :projects_users
  end
end
