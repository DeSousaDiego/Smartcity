import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commentCardStyles } from '../styles/styles';
import { AVATAR_IP } from '../constants/constants';


const CommentCard = ({ item, textColor }) => {

    const handleLikeClick = () => {
        setLikes(likes + 1);
      };
    
      const handleDislikeClick = () => {
        setDislikes(dislikes + 1);
      };

    let imgPath = null;
    let imgSource = null;

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
            <Text style={commentCardStyles.likeButton}>👍</Text>
            </TouchableOpacity>
            <Text style={commentCardStyles.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
            <TouchableOpacity onPress={handleDislikeClick}>
            <Text style={commentCardStyles.dislikeButton}>👎</Text>
            </TouchableOpacity>
        </View>
        </View>
        </View>
    );
}

export default CommentCard;