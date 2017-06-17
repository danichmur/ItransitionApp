class DocumentsController < ApplicationController
  
  def create
    documents = Documents.on_project(discussions_params)
    render status: 200, json: documents.to_json(:only => :id)
  end
  
  def destroy
    project = Project.find(hash[:project_id])
    project.documents.delete(hash[:id])
    render status: 200
  end
  
  def documents_params
    params.permit(:project_id, :id, :name, :url)
  end
end
