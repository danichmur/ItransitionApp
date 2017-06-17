class DiscussionsController < ApplicationController
  
  def show
    project = Project.find(dis_params[:project_id])
    discussion = project.discussions.find(dis_params[:id])
    render status: 200, json: discussion.
      to_json(:include => 
        {:comments => 
          {:except => [:discussion_id]}
        }
      )
  end
  
  def create
    discussion = Discussion.on_project(dis_params)
    render status: 200, json: discussion.to_json(:only => :id)
  end
  
  def destroy
    project = Project.find(dis_params[:project_id])
    project.discussions.delete(dis_params[:id])
    render status: 200
  end

  def dis_params
    params.permit(:project_id, :id, :name)
  end
end
