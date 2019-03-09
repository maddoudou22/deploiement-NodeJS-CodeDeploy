
echo off

SET nom_Projet_Git=deploiement-NodeJS-CodeDeploy
SET URL_Projet_Git=https://github.com/maddoudou22/deploiement-NodeJS-CodeDeploy.git
SET Repertoire_Local_Projet=C:\awsLambda\nodejs\SteamApp\GitHub\deploiement-NodeJS-CodeDeploy

cd %Repertoire_Local_Projet%

echo "Git Add ..."
git add -A

echo "Git Commit ..."
git commit -m "latest push from windows"

echo "Git Push ..."
git push %URL_Projet_Git%
