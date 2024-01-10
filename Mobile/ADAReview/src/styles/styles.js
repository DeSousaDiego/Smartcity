// styles.js
import { StatusBar, StyleSheet } from 'react-native';

// Styles des cartes pour book/account/review
export const cardStyle = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#F0F0EC',
  },
  item: {
    padding: 15,
    marginHorizontal : 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountImage: {
    width: 130,
    height: 150,
    marginRight: 10,
  },
  bookImage: {
    width: 130,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    alignItems :'flex-start',
    width : '50%'
  },
  bookTitle: {
    alignSelf : 'flex-start',
    marginLeft : 10,
    fontSize: 20,
    fontFamily : 'Inter_900Black'
  },
  date: {
    fontSize: 14,
    color: '#808080',
  },
  author: {
    fontSize: 18,
    marginLeft : 10,
    marginBottom: 8,
    fontFamily : 'Inter_800ExtraBold'
  },
  text: {
    color: '#808080',
    alignSelf :'flex-start',
    marginTop : 5,
    marginLeft : 10,
    fontSize: 15,
    fontFamily : 'Inter_400Regular'
  },
  likeDislikeContainer: {
    flexDirection: 'column',
    flexGrow : 1
  },
  likeButton: {
    alignSelf : 'flex-end',
    fontSize: 15,
    marginBottom : 10,
    color: '#00cc00', // Couleur du bouton Like
  },
  dislikeButton: {
    alignSelf : 'flex-end',
    fontSize: 15,
    color: '#cc0000', // Couleur du bouton Dislike
  },
  reviewImage: {
    width: 130,
    height: 150,
    marginRight: 10,
  },
  reviewBookImage: {
    width: 130,
    height: 150,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft : 10,
    fontFamily : 'Inter_400Regular'
  },
  reviewAccountTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  reviewBookTitle:{
    fontSize: 18,
    marginLeft : 10,
    fontFamily : 'Inter_800ExtraBold',
    marginBottom : 10
  },
  voteCount: {
    alignSelf : 'flex-end',
    marginBottom : 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

// BookScreen
export const bookDetailsstyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex: 1,
  },
  image: {
    width: 300,
    height: 260,
    marginRight: 10,
  },
  icon: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft : 15
  },
  content: {
    alignItems : 'center',
    marginBottom: 30, 
  },
  title: {
    fontSize: 32,
    fontWeight:'800',
    textAlign :'center',
    marginTop: 7,
    marginBottom : 15,
    color : '#354F52'
  },
  ratingContainer:{
    flexDirection: 'row', 
    alignItems:'center'
  },
  info: {
    textAlign: 'center',
    fontSize : 16,
    marginTop : 5,
    marginBottom :7,
    color : '#000',
    fontWeight : '400'
  },
  author: {
    fontSize: 20,
    marginBottom : 7,
    color : '#000',
    fontWeight:'800'
  },
  date: {
    fontSize: 16,
    marginTop: 5,
    color: '#808080',
  },
  reviewContainer: {
    backgroundColor: '#354F52',
    borderRadius : 0,
    width : '91%',
    padding: 10,
    marginTop: 20, // Ajustez la marge pour définir l'espace entre le livre et le conteneur de la critique
  },
  cardContainer:{
    width:'95%',
    marginTop : 40
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom : 10,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#354F52',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addIcon:{
    color :'white',
    fontWeight : '800',

  },
  addText: {
    color: 'white',
    fontWeight : '800',
    fontSize: 23,
  },
});

//SearchScreen
export const searchStyles = StyleSheet.create({
  bar: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingBottom: 10, 
    paddingTop: 10,
  },
  container : {
    backgroundColor :'#354F52', 
    borderTopWidth :'0'
  },
  topContainer : {
    backgroundColor: '#F0F0EC',
    flex : 1
  },
  input :{
    backgroundColor: "white",
    paddingLeft: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  }
})
export const homeStyles = StyleSheet.create({
  header : { backgroundColor: '#354F52', 
  alignItems: 'center', 
  justifyContent: 'center', 
  paddingTop : 40, 
  paddingBottom : 20 
},
text : {
  color: 'white', 
  fontSize: 28, 
  fontFamily: 'Oswald_700Bold'
}
});
export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0EC'
  },
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#354F52',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    marginLeft : 15,
    alignItems: 'center',
  },
  userInfoContainer: {
    marginLeft: 10,
  },
  profileImage: {
    marginLeft : 20,
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontFamily : 'Oswald_700Bold',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 20,
    color: 'white',
    fontFamily : 'Oswald_700Bold',
  },
  ratingText: {
    fontSize: 20,
    color: 'white',
  }
});

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#354F52",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 10.80,
  },
  rectangleContainer: {
    backgroundColor: "#354F52",
    shadowColor: "black",
    shadowOpacity: 0.5,
    width: "80%",
    padding: 20,
    alignItems: "center",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    minHeight: 45,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    width: "100%",
    alignSelf: "center",
    height: 50,
    display: 'flex',
    padding: 10,
  },
  registerText: {
    color: "#007bff",
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9D9D9",
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
  },

  backText: {
    color: 'blue',
    fontSize: 20,
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 50,
  },
});

export const reviewFormStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex : 1
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  icon: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentBook: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight:'800',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: '#354F52',
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: '800',
  },
  titleInputContainer: {
    alignSelf : 'center',
    alignItems : 'center',
    width : '90%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 5,
    paddingBottom: 5,
    marginBottom: 20,
  },
  reviewInputContainer: {
    alignSelf : 'center',
    alignItems : 'center',
    width : '90%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  ratingInputContainer: {
    alignSelf : 'center',
    alignItems : 'center',
    width : '90%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  titleInput: {
    width : '100%',
    height: 40,
  },
  reviewInput: {
    width : '100%',
    height: 100,
    textAlignVertical: 'top', // Pour que le texte commence en haut du TextInput
  },
  inputAccessoryView: {
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  inputAccessoryButton: {
    color: 'blue',
    fontWeight: 'bold',
    padding: 10,
  },
  submitButton: {
    marginTop: 5,
    marginBottom : 30,
    padding: 10,
    width : '30%',
    backgroundColor: '#354F52',
    alignSelf :'center',
    alignItems: 'center', // Centrer horizontalement
  },
});

export const reviewScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    padding: 20,
  },
  image: {
    width: 100,
    height: 135,
    marginRight: 10,
  },
  titleBook: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#354F52',
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: '800',
  },
  buttonAdd: {
    backgroundColor: '#354F52',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    margin: 20,
  },
  sectionbutton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewContaineur: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderBottomWidth: 0, // Remove the bottom border
  },
  reviewContentContaineur: {
    padding: 10,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    borderWidth: 2,
    borderTopWidth: 0, // Remove the top border
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10, // Gardez la marge à droite si nécessaire
    borderRadius: 100,
  },
  textreviewContaineur: {
    flex: 1,
  }, 
  contentReview: {
    fontWeight: 'bold',
  },
  commentInfoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    padding: 10,
    flex: 1, // Ajuster automatiquement la hauteur
  },
  commentName: {
    fontWeight: 'bold',
    color: "#354F52",
    fontSize: 20,
  },
  titleReview: {
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permettre le retour à la ligne
  },
  likesDislikeContainerReview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    top: 20,
    paddingBottom: 20,
  },
  likeButton: {
    fontSize: 15,
    marginEnd: 10,
  },
  dislikeButton: {
    fontSize: 15,
    marginStart: 10,
  },
  voteCount: {
    fontSize: 15,
    marginBottom: 10,
  },
  likesDislikeContainerComment: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 20,
    paddingBottom: 10,
  },
  contentComment: {
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permettre le retour à la ligne
  }
});

export const commentCardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    padding: 20,
    marginBottom: 50,
  },
  image: {
    width: 100,
    height: 120,
    marginRight: 10,
  },
  titleBook: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#354F52',
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: '800',
  },
  buttonAdd: {
    backgroundColor: '#354F52',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    margin: 20,
  },
  sectionbutton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reviewContaineur: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderBottomWidth: 0, // Remove the bottom border
  },
  reviewContentContaineur: {
    padding: 10,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    borderWidth: 2,
    borderTopWidth: 0, // Remove the top border
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10, // Gardez la marge à droite si nécessaire
    borderRadius: 100,
  },
  textreviewContaineur: {
    flex: 1,
  }, 
  contentReview: {
    fontWeight: 'bold',
  },
  commentInfoContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    padding: 10,
    flex: 1, // Ajuster automatiquement la hauteur
  },
  commentName: {
    fontWeight: 'bold',
    color: "#354F52",
    fontSize: 20,
  },
  titleReview: {
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permettre le retour à la ligne
  },
  likesDislikeContainerReview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    top: 20,
    paddingBottom: 20,
  },
  likeButton: {
    fontSize: 15,
    marginEnd: 10,
  },
  dislikeButton: {
    fontSize: 15,
    marginStart: 10,
  },
  voteCount: {
    fontSize: 15,
    marginBottom: 10,
  },
  likesDislikeContainerComment: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 20,
    paddingBottom: 10,
  },
  contentComment: {
    fontWeight: 'bold',
    flexWrap: 'wrap', // Permettre le retour à la ligne
  },
});


export const commentFormStyles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    flex: 1,
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginRight: 10,
  },
  icon: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  contentBook: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#354F52',
  },
  author: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: '800',
  },
  titleInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 5,
    paddingBottom: 5,
    marginBottom: 20,
  },
  commentInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  ratingInputContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  titleInput: {
    height: 40,
  },
  commentInput: {
    height: 100,
    textAlignVertical: 'top', // Pour que le texte commence en haut du TextInput
  },
  submitButton: {
    marginTop: 5,
    marginBottom: 50,
    padding: 10,
    backgroundColor: '#354F52',
    alignItems: 'center', // Centrer horizontalement
  },
});