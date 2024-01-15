import React, {useCallback} from 'react';
import { View, Image, Text, SafeAreaView, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewData } from '../store/dataBaseLoader';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ReviewCard from './ReviewCard';
import BackButton from './BackButton';
import { profileStyles } from '../styles/styles';
import { AVATAR_IP } from '../constants/constants';
import AccountOptions  from './AccountOptions';
import Item from './Item';

function AccountDetails ({ account, isMainAccount }) {
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const reviews = useSelector(state => state.reviews.reviews);
  const books = useSelector(state => state.books.books);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const imagePath = AVATAR_IP + (account?.img_path ? account.img_path : 'unknown.jpeg');
  const imageSource = { uri: imagePath };
  const token = useSelector(state => state.auth.token);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Appeler la fonction pour recharger les données de la base de données ici
    fetchReviewData(dispatch, token)
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      await fetchReviewData(dispatch, token);
    }
    fetchReviews();
  }, [dispatch, token]);
  
  useEffect(() => {
    setFilteredReviews(reviews.filter(review => review.user_id === account.id));
  }, [reviews, books]);


  const renderItem = ({ item }) => (
    <Item
      item={item}
      isSelected={item.id === selectedId}
      cardComponent={ReviewCard}
      type={'accountPresentation'}
      onPress={() => {
        navigation.navigate('Review', { review: item, book: books.find(book => book.isbn === item.book_id)});
        setSelectedId(item.id);
      }}
    />
  );

  return (
      <>
      <View>
        <FlatList
          data={filteredReviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          ListHeaderComponent={
          <SafeAreaView style={profileStyles.topContainer}>
            <BackButton navigation={navigation} color={'white'} />
            <View style={profileStyles.profileContainer}>
              <Image
                source={imageSource}
                style={profileStyles.profileImage}
              />
              <View style={profileStyles.userInfoContainer}>
                <Text style={profileStyles.username}>{account.username}</Text>
                <Text style={profileStyles.rating}>{account.nb_ratings} critique(s)</Text>
              </View>
              <View style={{marginLeft : 20, marginBottom : 15}} >
                {account && <>{isMainAccount && <AccountOptions/>}</>}
              </View>
            </View>
          </SafeAreaView>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </View>
    </>
  );
}

export default AccountDetails;
