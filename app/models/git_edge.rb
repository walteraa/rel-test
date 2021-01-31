# frozen_string_literal: true

class GitEdge
  include ActiveModel::Model
  attr_accessor :source, :target

  validates :source, :target, presence: true
end
