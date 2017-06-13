class Documents < ActiveRecord::Migration[5.1]
  def change
    create_table :documents do |t|
      t.string :name
      t.string :url
      t.belongs_to :project, index: true
      t.datetime :published_at
      t.timestamps
    end
    
    create_table :discussions do |t|
      t.string :name
      t.belongs_to :project, index: true
      t.datetime :published_at
      t.timestamps
    end
  end
end
