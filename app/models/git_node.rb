# frozen_string_literal: true

class GitNode
  include ActiveModel::Model
  attr_accessor :id, :message, :timestamp, :parents, :diff

  validates :id, :timestamp, presence: true
end