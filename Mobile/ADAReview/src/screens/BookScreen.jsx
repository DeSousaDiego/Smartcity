import React, { useEffect } from 'react';
import { SafeAreaView,FlatList, RefreshControl } from 'react-native';
import { useState } from 'react';
import Item from '../components/Item';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
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
  const token = useSelector(state => state.auth.token);
  const [refreshing, setRefreshing] = React.useState(false);

  // Ne garder que les reviews du livres
  const filteredReviews = reviews.filter(review => review.isbn === book.isbn);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Recharger les données des critiques
      fetchReviewData(dispatch, token);
    }, [dispatch, token])
  );
  
  
  const renderItem = ({item}) => (
    <Item
      item={item}
      onPress={() => {
        // Naviguez vers l'écran 'Review' avec les informations du livre sélectionné
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
     </SafeAreaView>
  );
};



export default BookScreen;