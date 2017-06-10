class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    drop_table :projects
    create_table :projects do |t|
      t.string :name
      t.string :author
      t.boolean :active
      t.text :description

      t.timestamps
    end
  end
end
