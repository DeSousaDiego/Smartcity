import React, {useEffect, useState} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commentCardStyles } from '../styles/styles';
import { AVATAR_IP } from '../constants/constants';
import { addLike, removeLike, addDislike, removeDislike } from '../API/comment';
import { useSelector, useDispatch } from 'react-redux';
import { modifyComment } from '../store/commentSlice';


const CommentCard = ({ item, textColor }) => {

  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  let imgPath = null;
  let imgSource = null;
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
  }, [item]);
  
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
      
      dispatch(modifyComment(item.id, token));
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