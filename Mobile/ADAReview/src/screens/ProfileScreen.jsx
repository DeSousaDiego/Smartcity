// ProfileScreen.js

import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import Item from '../components/Item';
import ReviewCard from '../components/ReviewCard';
import { useState } from 'react';
import { profileStyles } from '../styles/styles';
import { View, Image, Text, SafeAreaView, FlatList } from 'react-native';
import BackButton from '../components/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewData } from '../store/dataBaseLoader';

function ProfileScreen() {
  const route = useRoute();
  const [selectedId, setSelectedId] = useState();
  const dispatch = useDispatch();
  const { account } = route.params;
  const navigation = useNavigation();
  const reviews = useSelector(state => state.reviews.reviews);
  const filteredReviews = reviews.filter(review => review.username === account.username);
  const imagePath = "http://192.168.1.7:3001/images/" + (account.img_path ? account.img_path : 'unknown.jpeg');
  const imageSource = { uri: imagePath };

  useEffect(() =>{
    fetchReviewData(dispatch);
  }, [])

  const renderItem = ({ item }) => (
    <Item
      item={item}
      onPress={() => {
        navigation.push('Review', { review: item });
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
            </View>
          </SafeAreaView>}
        />
      </View>
    </>
  );
}


export default ProfileScreen;
