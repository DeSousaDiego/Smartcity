import React from 'react';
import { View, Image, Text } from 'react-native';
import Rating from './StarRating';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';

const ReviewCard = ({ item, textColor, type }) => {
  if(type === 'bookPresentation'){
    return(
      <View style={cardStyle.detailsContainer}>
          <Image source={item.image} style={cardStyle.reviewImage} />
          <View style={cardStyle.textContainer}>
            <Text style={[cardStyle.reviewTitle, { color: textColor }]}>{item.title}</Text>
            <Text style={[cardStyle.username, { color: textColor }]}>{item.username}</Text>
            <AirbnbRating showRating={false} starContainerStyle={{alignSelf : 'flex-start'}}size={20} defaultRating={item.rating} />
          </View>
            <View style={cardStyle.likeDislikeContainer}>
              <Text style={cardStyle.likeButton}>👍</Text>
              <Text style={cardStyle.voteCount}>{item.likes - item.dislikes}</Text>
              <Text style={cardStyle.dislikeButton}>👎</Text>
            </View>
        </View>

    );
  
  }
  else if(type === 'accountPresentation'){
    return (
      <View style={cardStyle.detailsContainer}>
        <Image source={item.book_image} style={cardStyle.reviewBookImage} />
        <View style={cardStyle.textContainer}>
          <Text style={[cardStyle.title, { color: textColor }]}>{item.book_name}</Text>
          <Text style={[cardStyle.username, { color: textColor }]}>{item.title}</Text>
          <AirbnbRating showRating={false} starContainerStyle={{alignSelf : 'flex-start'}}size={20} defaultRating={item.rating} />
        </View>
        <View style={cardStyle.likeDislikeContainer}>
          <Text style={cardStyle.likeButton}>👍</Text>
          <Text style={cardStyle.voteCount}>{item.likes - item.dislikes}</Text>
          <Text style={cardStyle.dislikeButton}>👎</Text>
        </View>
      </View>
    );
  }

};
export default ReviewCard;
