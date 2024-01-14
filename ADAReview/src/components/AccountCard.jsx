import React from 'react';
import { View, Image, Text } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés
import { AVATAR_IP } from '../constants/constants';

function AccountCard ({ item, textColor }) {
  const imagePath = AVATAR_IP + (item.img_path ? item.img_path : 'unknown.jpeg');
  const imageSource = { uri: imagePath };
  return(
  <View style={cardStyle.detailsContainer}>
    <Image source={imageSource} style={cardStyle.accountImage} />
    <View style={cardStyle.textContainer}>
      <Text style={[cardStyle.author, {fontWeight :'800'}, { color: textColor }]}>{item.username}</Text>
      <Text style={[cardStyle.text, { color: textColor }]}>
        ({item.nb_ratings} {item.nb_ratings === 1 ? 'critique' : 'critiques'})
      </Text>
    </View>
  </View>
);
}

export default AccountCard;
