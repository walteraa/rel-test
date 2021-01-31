# frozen_string_literal: true

class GitNode
  include ActiveModel::Model
  attr_accessor :id, :message, :timestamp

  validates :id, :timestamp, presence: true
end