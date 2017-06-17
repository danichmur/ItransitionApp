class DocumentsController < ApplicationController
  
  def create
    document = Document.on_project(doc_params)
    render status: 200, json: document.to_json(:only => :id)
  end
  
  def destroy
    project = Project.find(doc_params[:project_id])
    project.documents.delete(doc_params[:id])
    render status: 200
  end
  
  def doc_params
    params.permit(:project_id, :id, :name, :url)
  end
end
