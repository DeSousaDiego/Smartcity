// BookDetails.js
import React from 'react';
import { View, Image, Text } from 'react-native';

import { cardStyle } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';

const BookCard = ({ item, textColor }) => (
  <View style={cardStyle.detailsContainer}>
    <Image source={item.image} style={cardStyle.bookImage} />
    <View style={cardStyle.textContainer}>
      <Text style={[cardStyle.title, { color: textColor }]}>{item.title}</Text>
      <Text style={[cardStyle.text, { color: textColor }]}>{item.author}</Text>
      <Text style={[cardStyle.text, { color: textColor }]}>{item.date}</Text>
      <AirbnbRating showRating={false} size={20} defaultRating={item.rating} />
    </View>
  </View>
);

export default BookCard;
