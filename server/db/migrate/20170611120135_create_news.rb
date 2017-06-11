class CreateNews < ActiveRecord::Migration[5.1]
  def change
    create_table :news do |t|
      t.string :header
      t.text :body
      t.string :author

      t.timestamps
    end
  end
end
