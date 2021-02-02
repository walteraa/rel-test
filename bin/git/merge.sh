#!/bin/bash

merge() {
  source=$1
  target=$2
  message=$3
  current_branch=`git branch | awk '/^\*/{print $2}'`
  tmp_branch=tmp_${source}
  merge_branch="merging-${target}-${source}"

  git checkout ${source} -b ${tmp_branch}
  git checkout ${target_sha} -b ${merge_branch}
  git merge ${tmp_branch} -m "${message}"

  if [ $? -gt 0 ]
    then
      echo 'merge failed, reverting changes...'
      git merge --abort
      git checkout ${current_branch}
      git branch -D ${merge_branch}
      git branch -D ${tmp_branch}
      exit 1
    else
      echo 'successfully merged'
      git branch -D ${tmp_branch}
      git checkout ${current_branch}
      exit 0
  fi
}

merge $1 $2 "$3"

