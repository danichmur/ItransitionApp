class Docs < ActiveRecord::Migration[5.1]
  def change
    drop_table :documents
    create_table :documents do |t|
      t.string :name
      t.string :url
      t.belongs_to :project, index: true
      t.datetime :published_at
      t.timestamps
    end
  end
end
