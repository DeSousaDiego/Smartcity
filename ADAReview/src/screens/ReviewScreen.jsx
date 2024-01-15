import React, {useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, Text } from "react-native";
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from 'react-redux';
import Item from '../components/Item';
import CommentCard from '../components/CommentCard';
import { fetchCommentsData } from '../store/dataBaseLoader';
import ReviewCard from "../components/ReviewCard";
import { getActiveUser} from "../API/user";

function ReviewScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [account, setAccount] = useState(null);
  let {review, book} = route.params;
  let comments = useSelector(state => state.comments.comments);
  const token = useSelector(state => state.auth.token);
  
  useEffect(() => {
    async function fetchAccount() {
        const accountData = await getActiveUser(token);
        setAccount(accountData);
    }

    fetchAccount();
  }, [token]);


  useFocusEffect(
    React.useCallback(() => {
      // Appel pour charger les commentaires
      fetchCommentsData(dispatch, review.id, token);
      return () => {
        // Nettoyage ou autres actions quand l'écran perd le focus
      };
    }, [dispatch, review.id])
  );

  const renderItem = ({item}) => (
    <Item
      item={item}
      cardComponent={CommentCard}
    />
  );

  const renderFooter = () => {
    if (comments.length === 0) {
      return (
        <Text style={{textAlign : "center", fontSize : 20, fontFamily: 'Inter_400Regular'}} >Aucun commentaire</Text>
      );
    }
    return (
      <View style={{ height: 10 }} /> // Ajustez la hauteur selon vos besoins
    );
  };

  return (
    <>
    <SafeAreaView>
      <BackButton navigation={navigation} color={'#354F52'}/>
      <FlatList
          ListHeaderComponent={<ReviewCard item={review} book={book} type={'commentPresentation'}/>}
          nestedScrollEnabled = {true}
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
    </>
  );
}

export default ReviewScreen;