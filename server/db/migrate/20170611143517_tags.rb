class Tags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :value
    end
  end
end
