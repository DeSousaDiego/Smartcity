import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import BackButton from "../components/BackButton";
import { AirbnbRating } from 'react-native-ratings';
import { useSelector, useDispatch } from 'react-redux';
import Item from '../components/Item';
import CommentCard from '../components/CommentCard';
import { fetchCommentsData } from '../store/dataBaseLoader';

function ReviewScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {review} = route.params;
  const comments = useSelector(state => state.comments.comments);

  useFocusEffect(
    React.useCallback(() => {
      // Appel pour charger les commentaires
      fetchCommentsData(dispatch, review.id);
      return () => {
        // Nettoyage ou autres actions quand l'écran perd le focus
      };
    }, [dispatch, review.id])
  );

  const renderItem = ({item}) => (
    <Item
      item={item}
      cardComponent={CommentCard}
    />
  );


  const goToFormComment = () => {
    navigation.navigate('CommentForm', { review: review });
  };

  const renderFooter = () => {
    return (
      <View style={{ height: 100 }} />  // Ajustez la hauteur selon vos besoins
    );
  };

  return (
    <>
    <SafeAreaView>
        <BackButton navigation={navigation} color={'#354F52'}/>
      <ScrollView style= {styles.container}>

        <View style={styles.reviewContaineur}>
          <Image source={review.image} style={styles.image} />
          <View style={styles.textreviewContaineur}>
            <Text style={styles.author}>{review.username}</Text>
            <AirbnbRating showRating={false} size={20} defaultRating={review.rating} starContainerStyle={{alignSelf: 'flex-start'}}/>
            <Text style={styles.titleReview}>{review.title} </Text>
            <View style={styles.likesDislikeContainerReview}>
              <Text style={styles.likeButton}>👍</Text>
              <Text style={styles.voteCount}>{review.likes_counter - review.dislikes_counter}</Text>
              <Text style={styles.dislikeButton}>👎</Text>
            </View>
          </View>
        </View>

        <View style={styles.reviewContentContaineur}>
          <Text style={styles.contentReview}>
            {review.content}
          </Text>
        </View>

        <View style= {{marginTop: 40, marginBottom: 10, alignItems: 'center'}}>
          <Text style= {{fontSize: 30}}>
            Commentaires 
          </Text>
        </View>

        <TouchableOpacity style={styles.buttonAdd} onPress={goToFormComment}>
          <Text style={styles.sectionbutton}>Ajouter un commentaire</Text>
        </TouchableOpacity>
        
      </ScrollView>
      <FlatList
          nestedScrollEnabled = {true}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
          style={styles.flatListStyle}
        />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0EC',
    padding: 20,
    paddingBottom: 50,
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
  flatListStyle: {
    backgroundColor: '#F0F0EC',
    maxHeight: 400,
  },
});

export default ReviewScreen;
