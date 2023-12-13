// BookItem.js
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés

function Item ({ item, onPress, isSelected, cardComponent, type }){
  const backgroundColor = isSelected ? '#E9E9E2' : 'white';
  const textColor = '#000000';

  return (
    <TouchableOpacity onPress={onPress} style={[cardStyle.item, { backgroundColor }]}>
      {React.createElement(cardComponent, { item, textColor, type })}
    </TouchableOpacity>
  );

}
export default Item;
