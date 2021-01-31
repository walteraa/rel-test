# frozen_string_literal: true

class GitEdge
  attr_accessor :source, :target

  def initialize(source, target)
    @source = source
    @target = target
  end
end
