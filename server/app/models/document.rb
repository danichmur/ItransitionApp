class Document < ApplicationRecord
  belongs_to :project
  
  def self.on_project(doc_params)
    project = Project.find(doc_params[:project_id])  
    documents = Document.new(name: doc_params[:name],
       url: doc_params[:url])
    project.documents << documents
    return documents
  end
end
