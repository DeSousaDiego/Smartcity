import React, {useEffect, useState} from 'react';
import { View, Image, Text, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commentCardStyles } from '../styles/styles';
import { AVATAR_IP } from '../constants/constants';
import { addLike, removeLike, addDislike, removeDislike, deleteComment } from '../API/comment';
import { useSelector, useDispatch } from 'react-redux';
import { modifyComment } from '../store/commentSlice';
import { deleteComment as deleteCommentStore } from '../store/commentSlice';
import { getActiveUser } from "../API/user";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { errorHandling } from '../error/errorHandling';


const CommentCard = ({ item }) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const review = useSelector(state => state.reviews.reviews.find(review => review.id === item.review_id? item.review_id : null));
  const book = useSelector(state => state.books.books.find(book => book.isbn === review.book_id? review.book_id : null));
  let imgPath = null;
  let imgSource = null;
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    async function fetchAccount() {
        const accountData = await getActiveUser(token);
        setAccount(accountData);
    }

    fetchAccount();
  }, [token]);

  const deleteCommentUser = () => {
    Alert.alert(
      "Confirmation",
      "Etes-vous sur de vouloir supprimer ce commentaire ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Valider", onPress: () => {
          try{
            deleteComment(item.id, token);
            dispatch(deleteCommentStore(item.id));
            Alert.alert("Confirmation", "Commentaire supprimé", [{ text: "OK"}]);
            navigation.navigate('Review', { review: review, book: book });
          }
          catch(error){
            const errorMsg = errorHandling(error);
            Alert.alert(errorMsg);
          }
        }},
      ]
    );
  };


  const handleLikeClick = async () => {
    try {
      if (isDisliked) {
        await removeDislike(item.id, token);
        setIsDisliked(false);
      }
      if (isLiked) {
        await removeLike(item.id, token);
        setIsLiked(!isLiked);
      } else {
        await addLike(item.id, token);
        setIsLiked(true);
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleDislikeClick = async () => {
    try {
      if (isLiked) {
        await removeLike(item.id, token);
        setIsLiked(false);
      }
      if (isDisliked) {
        await removeDislike(item.id, token);
        setIsDisliked(!isDisliked);
      } else {
        await addDislike(item.id, token);
        setIsDisliked(true);
      }
      dispatch(modifyComment(item.id, token));
    } catch (error) {
      console.log(error);
    }
  };
  
  imgPath = AVATAR_IP + (item.img_path ? item.img_path : 'unknown.jpeg');
  imgSource = { uri: imgPath };
  
  return (
    <View style={commentCardStyles.commentInfoContainer}>
      <Image source={imgSource} style={commentCardStyles.profileImage} />
      <View style={commentCardStyles.textreviewContaineur}>
        <Text style={commentCardStyles.commentName}>{item.username}</Text>
        <Text style={commentCardStyles.contentComment}>{item.content}</Text>
        <View style={commentCardStyles.likesDislikeContainerComment}>
              {account &&
                <>
                  {account.id == item.user_id &&
                  <>
                      <View style = {commentCardStyles.modifyButton}>
                        <TouchableOpacity onPress={() => navigation.push('ModifyComment', {comment : item })}>
                          <Icon name="create-outline" size={30} color={'white'} ></Icon>
                        </TouchableOpacity>
                      </View>
                      <View style = {commentCardStyles.deleteButton}>
                        <TouchableOpacity onPress={deleteCommentUser}>
                          <Icon name="trash-outline" size={30} color={'white'} ></Icon>
                        </TouchableOpacity>
                      </View>
                  </>
                  }
                </>
              }
          <TouchableOpacity onPress={handleLikeClick}>
            <Text style={[commentCardStyles.likeButton, isLiked && { backgroundColor: '#354F52' }]}>👍</Text>
          </TouchableOpacity>
          <Text style={commentCardStyles.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
          <TouchableOpacity onPress={handleDislikeClick}>
            <Text style={[commentCardStyles.dislikeButton, isDisliked && { backgroundColor: '#354F52' }]}>👎</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CommentCard;