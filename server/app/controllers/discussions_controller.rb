class DiscussionsController < ApplicationController
  def index
  end
  
  def show
    project = Project.find(params[:project_id])
    discussion = project.discussions.find(params[:id])
    #discussion << {:users => project.users}
    render status: 200, json: discussion.
      to_json(:include => 
        {:comments => 
          {:except => [:discussion_id]}
        }
      )
  end
end
