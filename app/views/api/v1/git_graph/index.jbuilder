json.git_graph do
  json.nodes @git_graph.nodes do |node|
      json.id node.id
      json.timestamp node.timestamp
      json.message node.message
      json.parents node.parents
  end
  json.edges @git_graph.edges do |edge|
    json.source edge.source
    json.target edge.target
  end
end