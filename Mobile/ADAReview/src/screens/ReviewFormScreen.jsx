// ReviewForm.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, SafeAreaView  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirbnbRating } from 'react-native-elements';
import BackButton from '../components/BackButton';
import { sendForm } from '../API/reviews';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../store/reviewSlice';
import { fetchReviewData } from '../store/dataBaseLoader';

const ReviewFormScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { book } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  //const user_id = useSelector(state => state.auth.user_id);

  const submitReview = () => {
    const review = { title, content, rating, book_id: book.isbn, user_id: 1 };
    sendForm(JSON.stringify(review));
    dispatch(addReview(review));
    navigation.navigate('Book', { book: book });
  };

  return (
    <>
     {/*SafeAreaView pour garder le bouton back*/}
    <SafeAreaView>
      <BackButton navigation={navigation} color ={'#354F52'}/>
    </SafeAreaView>

    {/*KeyboardAwareScrollView pour ajuster le keyboard pendant écriture*/}
    <KeyboardAwareScrollView>
      
        <ScrollView style={styles.container}>
          <View style={styles.contentBook}>
              <Image source={book.image} style={styles.image} />
              <Text style={styles.title}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>
              <AirbnbRating showRating={false} size={20} defaultRating={book.rating} />
          </View>

          <View style={styles.ratingInputContainer}>
              <Text style={styles.sectionTitle}>Votre note :</Text>
              <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={0}
                size={40}
                onFinishRating={(value) => setRating(value)}
              />
          </View>

          <View style={styles.titleInputContainer}>
              <Text style={styles.sectionTitle}>Titre :</Text>
              <TextInput
              value={title}
              maxLength={33}
              onChangeText={(text) => setTitle(text)}
              style={styles.titleInput}
              returnKeyType="done"
              />
          </View>

          <View style={styles.reviewInputContainer}>
            <Text style={styles.sectionTitle}>Votre critique :</Text>
            <TextInput
              maxLength={500}
              value={content}
              onChangeText={(text) => setContent(text)}
              style={styles.reviewInput}
              multiline={true}
              blurOnSubmit={true}
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Ajouter</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
  reviewInputContainer: {
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
  reviewInput: {
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

export default ReviewFormScreen;