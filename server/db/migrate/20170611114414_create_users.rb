class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :nickname
      t.string :email
      t.string :password
      t.integer :position
      t.string :photo

      t.timestamps
    end
  end
end
