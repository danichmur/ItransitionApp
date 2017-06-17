class Document < ApplicationRecord
  belongs_to :project
  
  def self.on_project(documents_params)
    project = Project.find(documents_params[:project_id])  
    documents = Documents.new(name: documents_params[:name],
       url: documents_params[:url])
    project.documents << documents
    return documents
  end
end
