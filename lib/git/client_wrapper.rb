# frozen_string_literal: true

module Git
  class ClientWrapper

    def self.log_nodes
      command = `git log --all --pretty=format:'#{{ "hash": '%H', "parents_hash": '%P', "timestamp": '%ct', "message": "%s" }.to_json}',`
      JSON.parse("[#{command.chop}]")
    end
  end
end
