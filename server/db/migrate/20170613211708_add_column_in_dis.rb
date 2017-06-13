class AddColumnInDis < ActiveRecord::Migration[5.1]
  def change
    add_column :discussions, :body, :text
  end
end
