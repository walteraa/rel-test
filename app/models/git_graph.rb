# frozen_string_literal: true

class GitGraph
  include ActiveModel::Model
  attr_accessor :nodes, :edges

  def initialize(nodes: nodes, edges: edges)
    @nodes = nodes&.map do |node|
      GitNode.new(id: node['hash'],
                  message: node['message'],
                  timestamp: node['timestamp'],
                  parents: node['parents_hash']&.split(' '))
    end
    @edges = edges&.map { |edge| GitEdge.new(source: edge['source'], target: edge['target']) }
  end

  def find_node(hash)
    @nodes&.select{ |node| node.id == hash }.first
  end

end
