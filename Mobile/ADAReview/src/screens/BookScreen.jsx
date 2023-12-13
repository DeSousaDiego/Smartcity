import React from 'react';
import { SafeAreaView,FlatList } from 'react-native';
import { useState } from 'react';
import Item from '../components/Item';
import { useNavigation, useRoute } from '@react-navigation/native';
import { bookDetailsstyles } from '../styles/styles';
import ReviewCard from '../components/ReviewCard';
import BackButton from '../components/BackButton';
import BookDetails from '../components/BookDetails';

const BookScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {book} = route.params;
  const [selectedId, setSelectedId] = useState();
  const reviews = [
    {
      id : 1,
      id_book: '978-1885-77-414',
      image : require('./images/sasuke.jpg'),
      title : 'On vit vraiment dans une saucisse',
      username : 'Xx_DarkSasuke_xX',
      rating : 4.5,
      likes : 100,
      dislikes : 200
    },
    {
      id : 2,
      id_book: '977-1885-77-414',
      image : require('./images/sasuke.jpg'),
      title : 'On vit vraiment dans une saucisse',
      username : 'Xx_DarkSasuke_xX',
      rating : 3,
      likes : 200,
      dislikes : 200
    },
    {
      id : 3,
      id_book: '976-1885-77-414',
      image : require('./images/sasuke.jpg'),
      title : 'On vit vraiment dans une saucisse',
      username : 'Xx_DarkSasuke_xX',
      rating : 1.5,
      likes : 300,
      dislikes : 200
    },
  ];
  
  const renderItem = ({item}) => (
    <Item
      item={item}
      onPress={() => {
        // Naviguez vers l'écran 'Book' avec les informations du livre sélectionné
        navigation.push('Review', { review: item });
        setSelectedId(item.id);
      }}
      isSelected={item.id === selectedId}
      cardComponent={ReviewCard}
      type = {'bookPresentation'}
    />
  );
  

  return (
    <SafeAreaView style={bookDetailsstyles.container}>
      <BackButton navigation={navigation} color={'#354F52'}/> 
    <FlatList
      ListHeaderComponent={
        <BookDetails book={book} navigation={navigation}/>
      }
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
     </SafeAreaView>
  );
};



export default BookScreen;