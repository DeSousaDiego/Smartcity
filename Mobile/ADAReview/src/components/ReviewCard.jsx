import React from 'react';
import { View, Image, Text } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';

const ReviewCard = ({ item, textColor, type }) => {
  let imgPath = null;
  let imgSource = null;
  if(type === 'bookPresentation'){
    imgPath = "http://192.168.0.43:3001/upload/images/" + (item.account_img_path ? item.account_img_path : 'unknown.jpeg');
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
    imgPath = "http://192.168.0.43:3001/upload/images/" + (item.book_img_path ? item.book_img_path : 'unknownBook.jpeg');
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

};
export default ReviewCard;
