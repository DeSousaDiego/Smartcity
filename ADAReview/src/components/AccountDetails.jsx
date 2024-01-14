import React from 'react';
import { View, Image, Text } from 'react-native';
import { cardStyle } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewData } from '../store/dataBaseLoader';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import ReviewCard from './ReviewCard';
import { SafeAreaView } from 'react-native';
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
  const [filteredReviews, setFilteredReviews] = useState([]);
  const imagePath = AVATAR_IP + (account?.img_path ? account.img_path : 'unknown.jpeg');
  const imageSource = { uri: imagePath };
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    async function fetchReviews() {
      await fetchReviewData(dispatch, token);
    }
    fetchReviews();
  }, [dispatch, token]);

  useEffect(() => {
    setFilteredReviews(reviews.filter(review => review.user_id === account.id));
  }, [reviews]);

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.navigate('Review', { review: item });
        setSelectedId(item.id);
      }}
      isSelected={item.id === selectedId}
      cardComponent={ReviewCard}
      type={'accountPresentation'}
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
        />
      </View>
    </>
  );
}

export default AccountDetails;
