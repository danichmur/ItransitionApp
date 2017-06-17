class Users < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :email_code
  end
end
