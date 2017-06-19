class ChangeColumnInProject < ActiveRecord::Migration[5.1]
  def change
    remove_column :projects, :author, :string
    add_column :projects, :author, :int
  end
end
