// ProfileScreen.js

import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import Item from '../components/Item';
import ReviewCard from '../components/ReviewCard';
import { useState } from 'react';
import { profileStyles } from '../styles/styles';
import { View, Image, Text, SafeAreaView, FlatList } from 'react-native';
import BackButton from '../components/BackButton';

function ProfileScreen() {
  const route = useRoute();
  const [selectedId, setSelectedId] = useState();
  const { account } = route.params;
  const navigation = useNavigation();
  const reviews = [
    {
      id: 1,
      id_book: '978-1885-77-414',
      book_name : 'The Lord of the Rings : The two towers',
      book_image: require('./images/test.jpg'),
      title: 'On vit vraiment dans une saucisse',
      username: 'Xx_DarkSasuke_xX',
      rating: 4.5,
      likes: 100,
      dislikes: 200
    },
    {
      id: 2,
      id_book: '977-1885-77-414',
      book_name : 'Animal Farm',
      book_image: require('./images/test1.jpg'),
      title: 'On vit vraiment dans une saucisse',
      username: 'Xx_DarkSasuke_xX',
      rating: 3,
      likes: 200,
      dislikes: 200
    },
    {
      id: 3,
      id_book: '976-1885-77-414',
      book_name : 'Brave New World',
      book_image: require('./images/test2.jpg'),
      title: 'On vit vraiment dans une saucisse',
      username: 'Xx_DarkSasuke_xX',
      rating: 1.5,
      likes: 300,
      dislikes: 200
    },
  ];

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
    <View style={profileStyles.container}>
      <SafeAreaView style={profileStyles.topContainer}>
        <BackButton navigation={navigation} color={'white'} />
        <View style={profileStyles.profileContainer}>
          <Image
            source={account.image}
            style={profileStyles.profileImage}
          />
          <View style={profileStyles.userInfoContainer}>
            <Text style={profileStyles.username}>{account.username}</Text>
            <Text style={profileStyles.rating}>{account.nbRatings} critique(s)</Text>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
        />
      </View>
    </View>
  );
}


export default ProfileScreen;
