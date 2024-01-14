import React, {useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, Text } from "react-native";
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from 'react-redux';
import Item from '../components/Item';
import CommentCard from '../components/CommentCard';
import { fetchCommentsData } from '../store/dataBaseLoader';
import { addInteraction } from "../store/interactionSlice";
import { reviewScreenStyles } from '../styles/styles';
import ReviewCard from "../components/ReviewCard";
import { getActiveUser} from "../API/user";

function ReviewScreen({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [account, setAccount] = useState(null);
  let {review, book} = route.params;
  let comments = useSelector(state => state.comments.comments);
  const token = useSelector(state => state.auth.token);
  const interactions = useSelector(state => state.interactions.interactions);
  
  useEffect(() => {
    async function fetchAccount() {
        const accountData = await getActiveUser(token);
        setAccount(accountData);
    }

    fetchAccount();
  }, [token]);

  // review.interactionType = null;
  // comments.forEach(comment => comment.interactionType = null);

  // interactions.forEach(interaction => {
  //   if (interaction === review.id) {
  //     const userInteraction = interaction.actions.find(action => action.userId === account.id);
  //     if (userInteraction) {
  //       review.interactionType = userInteraction.type; // 'like' or 'dislike'
  //     }
  //   }

  //   comments.forEach(comment => {
  //     if (interaction === comment.id) {
  //       const userInteraction = interaction.users.find(user => user.id === userId);
  //       if (userInteraction) {
  //         comment.interactionType = userInteraction.type; // 'like' or 'dislike'
  //       }
  //     }
  //   });
  // });


  // let reviewInteraction = interactions.find(interaction => interaction === review.id && interaction.actions[0].userId === account.id);
  // if (!reviewInteraction) {
  //   interactions.push(review.id);
  // }
  // review.interactionType = reviewInteraction?.actions[0].type; // 'like' or 'dislike'
  
  // comments.forEach(comment => {
  //   let commentInteraction = interactions.find(interaction => interaction === comment.id && interaction.actions[0].userId === account.id);
  //   if (!commentInteraction) {
  //     interactions.push(comment.id);
  //   }
  //   comment.interactionType = commentInteraction?.actions[0].type; // 'like' or 'dislike'
  // });



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