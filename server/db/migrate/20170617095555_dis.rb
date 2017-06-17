class Dis < ActiveRecord::Migration[5.1]
  def change
    remove_column :discussions, :published_at
  end
end
