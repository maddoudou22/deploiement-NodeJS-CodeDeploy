
echo off

SET nom_Projet_Git=SteamApp-ApplicationList-microservice
SET URL_Projet_Git=https://github.com/maddoudou22/SteamApp-ApplicationList-microservice.git
SET Repertoire_Local_Projet=C:\awsLambda\nodejs\SteamApp\GitHub\SteamApp-ApplicationList-microservice

cd %Repertoire_Local_Projet%

echo "Git Add ..."
git add -A

echo "Git Commit ..."
git commit -m "latest push from windows"

echo "Git Push ..."
git push %URL_Projet_Git%
