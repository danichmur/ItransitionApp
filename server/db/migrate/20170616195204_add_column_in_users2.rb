class AddColumnInUsers2 < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :email_code, :string
  end
end
