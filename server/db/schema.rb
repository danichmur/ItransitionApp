# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170616103051) do

  create_table "comments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text "body"
    t.integer "user_id"
    t.bigint "discussion_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_name"
    t.index ["discussion_id"], name: "index_comments_on_discussion_id"
  end

  create_table "discussions", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.bigint "project_id"
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_discussions_on_project_id"
  end

  create_table "documents", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "url"
    t.bigint "project_id"
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["project_id"], name: "index_documents_on_project_id"
  end

  create_table "news", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "header"
    t.text "body"
    t.string "author"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name"
    t.string "author"
    t.boolean "active"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects_tags", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "project_id"
    t.bigint "tag_id"
    t.index ["project_id"], name: "index_projects_tags_on_project_id"
    t.index ["tag_id"], name: "index_projects_tags_on_tag_id"
  end

  create_table "projects_users", id: false, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "project_id"
    t.bigint "user_id"
    t.index ["project_id"], name: "index_projects_users_on_project_id"
    t.index ["user_id"], name: "index_projects_users_on_user_id"
  end

  create_table "tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "authentication_token", limit: 30
    t.string "photo"
    t.integer "position"
    t.string "nickname"
    t.string "name"
    t.index ["authentication_token"], name: "index_users_on_authentication_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
