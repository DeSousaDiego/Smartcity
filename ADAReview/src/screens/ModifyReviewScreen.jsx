// ReviewForm.js
import React, { useState } from 'react';
import {  TouchableOpacity, View, Text, TextInput, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AirbnbRating } from 'react-native-elements';
import BackButton from '../components/BackButton';
import { updateReview as updateReviewAPI } from '../API/review';
import { useSelector, useDispatch } from 'react-redux';
import { updateReview } from '../store/reviewSlice';
import { reviewFormStyles } from '../styles/styles';
import { IMAGE_IP } from '../constants/constants';
import { errorHandling } from '../error/errorHandling';

const ModifyReviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { book, review } = route.params;
  const [title, setTitle] = useState(review.title);
  const [content, setContent] = useState(review.content);
  const [rating, setRating] = useState(review.rating);
  const imagePath = IMAGE_IP + book.img_path;
  const token = useSelector(state => state.auth.token);
  const imageSource = { uri: imagePath };

  const modifyReview = () => {
    const reviewUpdate = { id : review.id, title, content, rating, book_id: book.isbn, user_id: review.user_id};
    if(title === '' || content === ''){
      Alert.alert('Veuillez remplir tous les champs');
    }
    else{
      Alert.alert(
        "Validation",
        "Etes-vous sur de vouloir modifier cette critique ?",
        [
          { text: "Annuler", style: "cancel" },
          { text: "Valider", onPress: () => {
            try{
              updateReviewAPI(review.id, JSON.stringify(reviewUpdate), token);
              dispatch(updateReview(reviewUpdate));
              Alert.alert("Confirmation", "Critique modifiée", [{ text: "OK"}]);
              navigation.navigate('Book', { book: book });
            }
            catch(error){
              const errorMsg = errorHandling(error);
              Alert.alert(errorMsg);
            }
          }},
        ]
      );
    }
  }

  return (
    <>
     {/*SafeAreaView pour garder le bouton back*/}
    <SafeAreaView>
      <BackButton navigation={navigation} color ={'#354F52'}/>
    </SafeAreaView>

    {/*KeyboardAwareScrollView pour ajuster le keyboard pendant écriture*/}
    <KeyboardAwareScrollView>
      
        <ScrollView style={reviewFormStyles.container}>
          <View style={reviewFormStyles.contentBook}>
              <Image source={imageSource} style={reviewFormStyles.image} resizeMode="contain"/>
              <Text style={reviewFormStyles.title}>{book.title}</Text>
              <Text style={reviewFormStyles.author}>{book.author}</Text>
              <AirbnbRating showRating={false} size={20} defaultRating={book.rating} />
          </View>

          <View style={reviewFormStyles.ratingInputContainer}>
              <Text style={reviewFormStyles.sectionTitle}>Votre note :</Text>
              <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={rating}
                size={40}
                onFinishRating={(value) => setRating(value)}
              />
          </View>

          <View style={reviewFormStyles.titleInputContainer}>
              <Text style={reviewFormStyles.sectionTitle}>Titre :</Text>
              <TextInput
              value={title}
              maxLength={33}
              onChangeText={(text) => setTitle(text)}
              style={reviewFormStyles.titleInput}
              returnKeyType="done"
              />
          </View>

          <View style={reviewFormStyles.reviewInputContainer}>
            <Text style={reviewFormStyles.sectionTitle}>Votre critique :</Text>
            <TextInput
              maxLength={500}
              value={content}
              onChangeText={(text) => setContent(text)}
              style={reviewFormStyles.reviewInput}
              multiline={true}
              blurOnSubmit={true}
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity style={reviewFormStyles.submitButton} onPress={modifyReview}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Modifier</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};


export default ModifyReviewScreen;