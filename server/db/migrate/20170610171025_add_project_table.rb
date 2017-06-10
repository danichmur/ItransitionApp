class AddProjectTable < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :author
      t.boolean :active
      t.text :description
      t.timestamps
    end
  end
end
