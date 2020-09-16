# Reliant Test

Create a small git history visualization!

## Requirements

 - The frontend must use React.
 - The git data must be fetched from the rails server.
 - The git data should be the git data from this project itself.
 - The view must show the git commit tree.
   - All available branches should be show in the git commit tree.
   - It should be possible to visualize which are the parent commits, i.e. draw the lines linking git commits like the output of `git log --graph --format=oneline` or `gitk`.
 - When the user clicks on a git commit, the view should show the patch diff (basically the output of `git show --format=""`)
 - The user can merge patches by dragging a git commit into another git commit in the git commit tree.
   - The user should provide a merge message for the merge.
   - The merge should fail if there are any conflicts.

Inside this tarball you will find a rails6 app and its git repository (.git directory), you should implement the above functionality using this app/repository.
In doubt about how a git visualization looks like? type `git log --graph --format=oneline` or `gitk`.

## Additional information

 - No time to implement everything? No problem, say what is missing and deliver anyway.
 - How the view should look like is up to you, just be sure it will be possible to see any commit in the tree.
 - There's no need for authentication, etc... so you can just set the rails root to some method of your controller.
  - Don't need to show commit author, etc... just show the subject in the tree and the diff once a tree item is clicked.

## Things we will care about

 - How you elaborate the React component.
 - How you elaborate the Backend-Frontend interaction.
 - How much you care about the UI stuff, usability, etc...

## Delivering the test

 - Commit your code to this very same repository you found in the tar.gz file.
 - Execute `git clean -dfx` to remove all non-project files.
 - Create a tarball with everything (including the `.git` directory!!!)
 - *TEST BEFORE SENDING* uncompress the file somewhere, run the app and check if everything is working before sending.
 - Send it to the very same e-mail address you received it.
