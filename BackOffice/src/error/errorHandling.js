export const errorHandling = (error) => {
    let errorMsg = "";
    const statusCode = error?.response?.status;
    const customMsg = error?.response?.data;

    if(statusCode !== undefined){
        switch(statusCode) {
            case(400) :
                errorMsg = customMsg;
                break;
            case(401) : 
                errorMsg = "Erreur : vos informations d'identification sont incorrectes. Veuillez réessayer.";
                break;
            case(403) : 
                errorMsg = "Erreur : vous n'avez pas les autorisations nécessaires pour réaliser cette action.";
                break;
            case(404) : 
                errorMsg = "Erreur : la ressource n'a pas pu être trouvé. Veuillez vérifier votre URL.";
                break;
            case(500) : 
                errorMsg = "Erreur : Une erreur interne du serveur s'est produite. Veuillez réessayer ultérieurement.";
                break;
            default:
                errorMsg = "Erreur : pas de réponse reçue du serveur.";
        }
    }
    else{
        errorMsg = "Erreur : pas de réponse reçue du serveur.";
    }
    return errorMsg;
}