# frozen_string_literal: true

class GitGraph
  attr_accessor :nodes, :edges

  def initialize(nodes, edges)
    @nodes = nodes.map { |node| GitNode.new(node['hash'], node['message'], node['timestamp']) }
    @edges = edges.map { |edge| GitEdge.new(edge['source'], edge['target']) }
  end
end
