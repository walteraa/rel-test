# frozen_string_literal: true

class GitGraph
  include ActiveModel::Model
  attr_accessor :nodes, :edges

  def initialize(nodes: nodes, edges: edges)
    @nodes = nodes&.map { |node| GitNode.new(id: node['hash'], message: node['message'], timestamp: node['timestamp']) }
    @edges = edges&.map { |edge| GitEdge.new(source: edge['source'], target: edge['target']) }
  end

  validates :nodes, :edges, presence: true
end
