class CreateDiscussions < ActiveRecord::Migration[5.1]
  def change
    drop_table :discussions
    create_table :discussions do |t|
      t.string :name
      t.belongs_to :project, index: true
      t.datetime :published_at
      t.timestamps
    end
  end
end
