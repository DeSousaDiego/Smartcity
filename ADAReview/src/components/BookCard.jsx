// BookDetails.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';
import { IMAGE_IP } from '../constants/constants';

function BookCard({ item, textColor }) {
  const imagePath = IMAGE_IP + item.img_path;
  const imageSource = { uri: imagePath };
  return(
    <View style={cardStyle.detailsContainer}>
      <Image source={imageSource} style={cardStyle.bookImage} resizeMode= 'stretch'/>
      <View style={cardStyle.textContainer}>
        <Text style={[cardStyle.bookTitle, { color: textColor }]}>{item.title}</Text>
        <Text style={[cardStyle.text, { color: textColor }]}>{item.author}</Text>
        <Text style={[cardStyle.text, { color: textColor }]}>{item.released_year}</Text>
        <AirbnbRating showRating={false} size={20} defaultRating={item.rating} isDisabled={true} starContainerStyle={{marginTop : 5, marginLeft : 7}}/>
      </View>
    </View>
  );
}

export default BookCard;
