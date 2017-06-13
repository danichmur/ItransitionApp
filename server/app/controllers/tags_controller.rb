class TagsController < ApplicationController
  def index
    render status: 200, json: Tag.all.to_json(:only => [:value, :id])
  end
end
