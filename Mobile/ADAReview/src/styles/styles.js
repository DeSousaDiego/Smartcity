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

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0EC',
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
