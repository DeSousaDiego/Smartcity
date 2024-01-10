import React from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import { cardStyle, reviewScreenStyles } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { AVATAR_IP, IMAGE_IP } from '../constants/constants';

const ReviewCard = ({ item, textColor, type }) => {
  let imgPath = null;
  let imgSource = null;
  const navigation = useNavigation();
  if(type === 'bookPresentation'){
    imgPath = AVATAR_IP + (item.account_img_path ? item.account_img_path : 'unknown.jpeg');
    imgSource = { uri: imgPath };
    return(
      <View style={cardStyle.detailsContainer}>
         <Image source={imgSource} style={cardStyle.reviewImage}/>
          <View style={cardStyle.textContainer}>
            <Text style={[cardStyle.reviewBookTitle, { color: textColor }]}>{item.title}</Text>
            <Text style={[cardStyle.username, { color: textColor }]}>{item.username}</Text>
            <AirbnbRating showRating={false} size={20} defaultRating={item.rating} isDisabled={true} starContainerStyle={{marginTop : 5, marginLeft : 7}}/>
          </View>
            <View style={cardStyle.likeDislikeContainer}>
              <Text style={cardStyle.likeButton}>👍</Text>
              <Text style={cardStyle.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
              <Text style={cardStyle.dislikeButton}>👎</Text>
            </View>
        </View>

    );
  
  }
  else if(type === 'accountPresentation'){
    imgPath = IMAGE_IP + (item.book_img_path ? item.book_img_path : 'unknownBook.jpeg');
    imgSource = { uri: imgPath };
    return (
      <View style={cardStyle.detailsContainer}>
        <Image source={imgSource} style={cardStyle.reviewBookImage} resizeMode= 'stretch'/>
        <View style={cardStyle.textContainer}>
          <Text style={[cardStyle.bookTitle, { color: textColor }]}>{item.book_name}</Text>
          <Text style={[cardStyle.text, { color: textColor }]}>{item.title}</Text>
          <AirbnbRating showRating={false} size={20} defaultRating={item.rating} isDisabled={true} starContainerStyle={{marginTop : 5, marginLeft : 7}}/>
        </View>
        <View style={cardStyle.likeDislikeContainer}>
          <Text style={cardStyle.likeButton}>👍</Text>
          <Text style={cardStyle.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
          <Text style={cardStyle.dislikeButton}>👎</Text>
        </View>
      </View>
    );
  }
  else if(type === 'commentPresentation'){
    imgPath = IMAGE_IP + (item.book_img_path ? item.book_img_path : 'unknownBook.jpeg');
    imgSource = { uri: imgPath };
    return(
      <ScrollView style= {reviewScreenStyles.container}>

        <View style={reviewScreenStyles.reviewContaineur}>
          <Image source={imgSource} style={reviewScreenStyles.image} resizeMode= 'contain'/>
          <View style={reviewScreenStyles.textreviewContaineur}>
            <Text style={reviewScreenStyles.author}>{item.username}</Text>
            <AirbnbRating showRating={false} size={20} defaultRating={item.rating} starContainerStyle={{alignSelf: 'flex-start'}} isDisabled ={true}/>
            <Text style={reviewScreenStyles.titleReview}>{item.title} </Text>
            <View style={reviewScreenStyles.likesDislikeContainerReview}>
              <Text style={reviewScreenStyles.likeButton}>👍</Text>
              <Text style={reviewScreenStyles.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
              <Text style={reviewScreenStyles.dislikeButton}>👎</Text>
            </View>
          </View>
        </View>

        <View style={reviewScreenStyles.reviewContentContaineur}>
          <Text style={reviewScreenStyles.contentReview}>
            {item.content}
          </Text>
        </View>

        <View style= {{marginTop: 40, marginBottom: 10, alignItems: 'center'}}>
          <Text style= {{fontSize: 30}}>
            Commentaires 
          </Text>
        </View>

        <TouchableOpacity style={reviewScreenStyles.buttonAdd} onPress={() => { navigation.navigate('CommentForm', { review: item });}}>
          <Text style={reviewScreenStyles.sectionbutton}>Ajouter un commentaire</Text>
        </TouchableOpacity>
        
      </ScrollView>
    );
  }

};
export default ReviewCard;
