import React, { useEffect } from 'react';
import { SafeAreaView,FlatList } from 'react-native';
import { useState } from 'react';
import Item from '../components/Item';
import { useNavigation, useRoute } from '@react-navigation/native';
import { bookDetailsstyles } from '../styles/styles';
import ReviewCard from '../components/ReviewCard';
import BackButton from '../components/BackButton';
import BookDetails from '../components/BookDetails';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewData } from '../store/dataBaseLoader';

const BookScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {book} = route.params;
  const [selectedId, setSelectedId] = useState();
  const reviews = useSelector(state => state.reviews.reviews);
  // Ne garder que les reviews du livres
  const filteredReviews = reviews.filter(review => review.isbn === book.isbn);

  useEffect(() =>{
    fetchReviewData(dispatch);
  }, [])
  
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
      data={filteredReviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedId}
    />
     </SafeAreaView>
  );
};



export default BookScreen;