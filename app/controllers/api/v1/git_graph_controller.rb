# frozen_string_literal: true

module Api
  module V1
    class GitGraphController < ApplicationController
      before_action :get_logs, only: [:index, :show]

      def index
      end

      def show
        @node = @git_graph.find_node(params[:hash])
        @node.diff = Git::ClientWrapper.get_diff(@node.id)
      end

      def merge
        source = params[:source_hash]
        target = params[:target_hash]
        message = request.body.read
        response = Git::ClientWrapper.merge_commits(source, target, message)

        if(response)
          head :no_content
        else
          head :unprocessable_entity
        end
      end

      private

      def get_logs
        git_log = Git::ClientWrapper.log_nodes
        edges = []
        git_log.each do |node|
          sources = node['parents_hash'].split(' ')
          sources.each { |source| edges << { 'source' => source, 'target' =>node['hash']  } }
        end
        @git_graph = GitGraph.new(nodes: git_log, edges: edges)
      end
    end
  end
end
