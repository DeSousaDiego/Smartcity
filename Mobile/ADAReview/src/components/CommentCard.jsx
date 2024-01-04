import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CommentCard = ({ item, textColor }) => {

    const handleLikeClick = () => {
        setLikes(likes + 1);
      };
    
      const handleDislikeClick = () => {
        setDislikes(dislikes + 1);
      };

    let imgPath = null;
    let imgSource = null;

    imgPath = "http://192.168.0.43:3001/upload/images/" + (item.account_img_path ? item.account_img_path : 'unknown.jpeg');
    imgSource = { uri: imgPath };
    return (
        <View style={styles.commentInfoContainer}>
        <Image source={item.image} style={styles.profileImage} />
        <View style={styles.textreviewContaineur}>
        <Text style={styles.commentName}>{item.username}</Text>
        <Text style={styles.contentComment}>{item.content}</Text>
        <View style={styles.likesDislikeContainerComment}>
            <TouchableOpacity onPress={handleLikeClick}>
            <Text style={styles.likeButton}>👍</Text>
            </TouchableOpacity>
            <Text style={styles.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
            <TouchableOpacity onPress={handleDislikeClick}>
            <Text style={styles.dislikeButton}>👎</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default CommentCard;