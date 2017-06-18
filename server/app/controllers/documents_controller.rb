class DocumentsController < ApplicationController
  
  def index
  
  end
  
  def create
    document = Document.on_project(doc_params)
    render json: {:id => document.id, 
      :updated_at => document.updated_at}, status: 200
  end
  
  def destroy
    project = Project.find(doc_params[:project_id])
    project.documents.delete(doc_params[:id])
    render json: {status: :ok}
  end
  
  def doc_params
    params.permit(:project_id, :id, :name, :url)
  end
end
