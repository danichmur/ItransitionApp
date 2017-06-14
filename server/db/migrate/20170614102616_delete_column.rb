class DeleteColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :discussions, :body
  end
end
