étape 1 : Lancez docker puis dans un terminal cette commande :

docker run --name postgres -e POSTGRES_PASSWORD=B3YpeBGhZchIYOq -e POSTGRES_USER=adaReview -e POSTGRES_DB=project_REACT -p 5432:5432 --rm -d postgres

étape 2 : une fois le docker crée, initialisé la DB grace à la commande "npm run initDB"

étape 3 : faire un "npm install" pour installer les nodes modules

étape 4 : testez l'api en la lancant avec "npm run dev"