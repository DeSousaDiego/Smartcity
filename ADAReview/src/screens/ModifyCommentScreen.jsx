// ReviewForm.js
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-elements';
import { sendForm } from '../API/comment';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../store/commentSlice';
import { commentFormStyles } from '../styles/styles';
import { IMAGE_IP } from '../constants/constants';
import { errorHandling } from '../error/errorHandling';
import { updateComment } from '../API/comment';
import { modifyComment } from '../store/commentSlice';

const ModifyCommentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { comment } = route.params;
  const review = useSelector(state => state.reviews.reviews.find(review => review.id === comment.review_id));
  const [content, setContent] = useState(comment.content);
  const dispatch = useDispatch();
  const imgPath = IMAGE_IP + (review.book_img_path ? review.book_img_path : 'unknownBook.jpeg');
  const imgSource = { uri: imgPath };
  const token = useSelector(state => state.auth.token);
  
  const submitComment = () => {
    const commentUpdate = {content};
    if(content === ''){
      Alert.alert('Veuillez remplir tous les champs');
    }
    else{
      Alert.alert(
        "Validation",
        "Etes-vous sur de vouloir modifier ce commentaire ?",
        [
          { text: "Annuler", style: "cancel" },
          { text: "Valider", onPress: () => {
            try{
              updateComment(comment.id, JSON.stringify(commentUpdate), token);
              dispatch(modifyComment(commentUpdate));
              Alert.alert("Confirmation", "Commentaire modifiée", [{ text: "OK"}]);
              navigation.navigate('Review', { review: review });
            }
            catch(error){
              const errorMsg = errorHandling(error);
              Alert.alert(errorMsg);
            }
          }},
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={commentFormStyles.container}
    >
      <TouchableOpacity style={commentFormStyles.icon} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-sharp" size={30} color="#354F52" />
      </TouchableOpacity>
      <ScrollView style={commentFormStyles.container}>

        <View style={commentFormStyles.contentBook}>
            <Image source={imgSource} style={commentFormStyles.image} resizeMode= 'contain'/>
            <Text style={commentFormStyles.title}>{review.title}</Text>
            <Text style={commentFormStyles.author}>{review.author}</Text>
            <AirbnbRating showRating={false} size={20} defaultRating={review.rating} isDisabled ={true} />
            {/* Affichez d'autres informations sur le livre si nécessaire */}
        </View>

        <View style={commentFormStyles.commentInputContainer}>
            <Text style={commentFormStyles.sectionTitle}>Votre commentaire :</Text>
            <TextInput
            maxLength={100}
            multiline={true}
            returnKeyType='done'
            value={content}
            onChangeText={(text) => setContent(text)}
            style={commentFormStyles.commentInput}
            blurOnSubmit={true}
            />
        </View>

        <TouchableOpacity style={commentFormStyles.submitButton} onPress={submitComment}>
            <Text style={{ color: 'white' }}>Modifier</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ModifyCommentScreen;