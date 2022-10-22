#Bash script to push git changes to remote repository and then ftp to server

echo "git adding files"
git add .

echo "git commiting files with message $1"
git commit -m $1

echo "git pushing to origin master"
git push

echo "ftp pushing to server"
git ftp push