class ProjectsTags < ActiveRecord::Migration[5.1]
  def change
    create_table :projects_tags, id: false do |t|
      t.belongs_to :project, index: true
      t.belongs_to :tag, index: true
    end
  end
end