class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body
      t.integer :user_id
      t.belongs_to :discussion, index: true
      t.timestamps
    end
  end
end
