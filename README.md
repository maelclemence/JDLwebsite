# Bienvenue sur Github du Jeu de l'Oie !

## Get started

Install [git-ftp](https://github.com/git-ftp/git-ftp/blob/master/INSTALL.md)

```sh
git clone git@github.com:maelclemence/JDLwebsite.git
cd JDLwebsite/

# Setup
git config git-ftp.url "www.jeudeloie.ch"
git config git-ftp.user "jdl"
git config git-ftp.password "pswd"

# Upload all files
git ftp init

# Or if the files are already there
git ftp catchup
```