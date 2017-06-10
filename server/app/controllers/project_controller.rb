class ProjectController < ApplicationController
  def index
    render status: 200, json: {param: 'blabalbla'}
  end 
end
