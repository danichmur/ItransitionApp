class DiscussionsController < ApplicationController
  def index
  end
  
  def show
    project = Project.find(params[:project_id])
    discussion = project.discussions.find(params[:id])
    render status: 200, json: discussion.
      to_json(:include => 
        {:comments => 
          {:except => [:discussion_id]}
        }
      )
  end
  
  def discussions_on_project
    discussion = Discussion.on_project(discussions_params)
    if discussion
      render json: discussion.as_json(only: :id), status: :ok
    else
      render status: :ok
    end 
  end
  
  def discussions_params
    params.permit(:project_id, :id, :name)
  end
end
