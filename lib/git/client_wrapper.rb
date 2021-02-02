# frozen_string_literal: true

module Git
  class ClientWrapper

    def self.log_nodes
      command = `git log --all --pretty=format:'#{{ "hash": '%H', "parents_hash": '%P', "timestamp": '%ct', "message": "%s" }.to_json}',`
      JSON.parse("[#{command.chop}]")
    end

    def self.get_diff(hash)
      command = `git show #{hash} --format=""`
    end

    def self.merge_commits(source, target, message)
      current_branch =  `git branch | awk '/^\*/{print $2}'`
      temp_branch = "tmp_#{source}"
      merge_branch = "merge-#{source}-#{target}"
      `git checkout #{source} -b #{temp_branch}`
      `git checkout #{target} -b #{merge_branch}`
      result = system("git merge #{temp_branch} -m \"#{message}\"")

      if(result)
        `git merge --abort`
        `git checkout #{current_branch}`
        `git branch -D #{temp_branch}`
        `git branch -D #{merge_branch}`
      else
        `git branch -D #{temp_branch}`
        `git checkout #{current_branch}`
      end
      return result
    end
  end
end
