# frozen_string_literal: true

class GitNode
  attr_accessor :id, :message, :timestamp

  def initialize(hash, message, timestamp)
    @id = hash
    @message = message
    @timestamp = timestamp
  end
end