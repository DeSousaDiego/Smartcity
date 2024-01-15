import React, {useState, useEffect}from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { cardStyle, reviewFormStyles, reviewScreenStyles } from '../styles/styles'; // Importez les styles partagés
import { AirbnbRating } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AVATAR_IP, IMAGE_IP } from '../constants/constants';
import { addLike, removeLike, addDislike, removeDislike, deleteReview } from '../API/review';
import { useSelector } from 'react-redux';
import { getActiveUser} from "../API/user";
import Icon from 'react-native-vector-icons/Ionicons';
import { deleteReview as deleteReviewStore } from '../store/reviewSlice';
import { deleteComment } from '../store/commentSlice';
import { errorHandling } from '../error/errorHandling';



const ReviewCard = ({ item, textColor, type, book }) => {
  const token = useSelector(state => state.auth.token);
  const comments = useSelector(state => state.comments.comments);
  let imgPath = null;
  let imgSource = null;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [account, setAccount] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchAccount() {
        const accountData = await getActiveUser(token);
        setAccount(accountData);
    }

    fetchAccount();
  }, [token, isLiked, isDisliked]);

  const deleteReviewUser = () => {
    Alert.alert(
      "Confirmation",
      "Etes-vous sur de vouloir supprimer cette review ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Valider", onPress: () => {
          try{
            deleteReview(item.id, token);
            dispatch(deleteReviewStore(item.id));
            dispatch(deleteComment(comments.filter(comment => comment.review_id === item.id).map(comment => comment.id)));
            Alert.alert("Confirmation", "Review supprimé", [{ text: "OK"}]);
            navigation.navigate('Home');
          }
          catch(error){
            const errorMsg = errorHandling(error);
            Alert.alert(errorMsg);
          }
        }},
      ]
    );
  };

  const handleLike = async () => {
    try {
      //enleve dislike si il était sur dislike et qu'on clique sur like
      if (isDisliked) {
        await removeDislike(item.id, token);
        setIsDisliked(false);
      }
      //enleve like si il était selectionne OU ajoute like si il n'était pas selectionne
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
  
  const handleDislike = async () => {
    try {
      //enleve like si il était sur like et qu'on clique sur dislike
      if (isLiked) {
        await removeLike(item.id, token);
        setIsLiked(false);
      }
      //enleve dislike si il était selectionne OU ajoute dislike si il n'était pas selectionne
      if (isDisliked) {
        await removeDislike(item.id, token);
        setIsDisliked(!isDisliked);
      } else {
        await addDislike(item.id, token);
        setIsDisliked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if(type === 'bookPresentation'){
    imgPath = AVATAR_IP + (item.account_img_path ? item.account_img_path : 'unknown.jpeg');
    imgSource = { uri: imgPath };
    return(
      <View style={cardStyle.detailsContainer}>
         <Image source={imgSource} style={cardStyle.reviewImage}/>
          <View style={cardStyle.textContainer}>
            <Text style={[cardStyle.reviewBookTitle, { color: textColor }]}>{item.title}</Text>
            <Text style={[cardStyle.username, { color: textColor }]}>{item.username}</Text>
            <AirbnbRating showRating={false} size={20} defaultRating={item.rating} isDisabled={true} starContainerStyle={{marginTop : 5, marginLeft : 7}}/>
          </View>
            <View style={cardStyle.likeDislikeContainer}>
              <Text style={cardStyle.likeButton}>👍</Text>
              <Text style={cardStyle.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
              <Text style={cardStyle.dislikeButton}>👎</Text>
              {account &&
                <>
                  {account.id == item.userId &&
                    <TouchableOpacity onPress={() => navigation.push('ModifyReviewScreen')}>
                      <Text>Modify</Text>
                    </TouchableOpacity>
                  }
                </>
              }
            </View>
        </View>

    );
  
  }
  else if(type === 'accountPresentation'){
    imgPath = IMAGE_IP + (item.book_img_path ? item.book_img_path : 'unknownBook.jpeg');
    imgSource = { uri: imgPath };
    return (
      <View style={cardStyle.detailsContainer}>
        <Image source={imgSource} style={cardStyle.reviewBookImage} resizeMode= 'stretch'/>
        <View style={cardStyle.textContainer}>
          <Text style={[cardStyle.bookTitle, { color: textColor }]}>{item.book_name}</Text>
          <Text style={[cardStyle.text, { color: textColor }]}>{item.title}</Text>
          <AirbnbRating showRating={false} size={20} defaultRating={item.rating} isDisabled={true} starContainerStyle={{marginTop : 5, marginLeft : 7}}/>
        </View>
        <View style={cardStyle.likeDislikeContainer}>
          <Text style={cardStyle.likeButton}>👍</Text>
          <Text style={cardStyle.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
          <Text style={cardStyle.dislikeButton}>👎</Text>
          {account &&
                <>
                  {account.id == item.userId &&
                    
                    <TouchableOpacity onPress={() => navigation.push('ModifyReviewScreen')}>
                      <Text>Modify</Text>
                    </TouchableOpacity>
                  }
                </>
              }
        </View>
      </View>
    );
  }
  else if(type === 'commentPresentation'){
    imgPath = IMAGE_IP + (item.book_img_path ? item.book_img_path : 'unknownBook.jpeg');
    imgSource = { uri: imgPath };
    return(
      <ScrollView style= {reviewScreenStyles.container}>

        <View style={reviewScreenStyles.reviewContaineur}>
          <Image source={imgSource} style={reviewScreenStyles.image} resizeMode= 'contain'/>
          <View style={reviewScreenStyles.textreviewContaineur}>
            <Text style={reviewScreenStyles.author}>{item.username}</Text>
            <AirbnbRating showRating={false} size={20} defaultRating={item.rating} starContainerStyle={{alignSelf: 'flex-start'}} isDisabled ={true}/>
            <Text style={reviewScreenStyles.titleReview}>{item.title} </Text>
            <View style={reviewScreenStyles.likesDislikeContainerReview}>
              <TouchableOpacity onPress={handleLike}>
                <Text style={[{ fontSize: 30, padding: 10 }, isLiked && { backgroundColor: '#354F52' }]}>👍</Text>
              </TouchableOpacity>
              <Text style={reviewScreenStyles.voteCount}>{item.likes_counter - item.dislikes_counter}</Text>
              <TouchableOpacity onPress={handleDislike}>
                <Text style={[{ fontSize: 30, padding: 10 }, isDisliked && { backgroundColor: '#354F52' }]}>👎</Text>
              </TouchableOpacity>
            </View>
            
            {account &&
                <>
                  {account.id == item.user_id &&
                    <>
                      <View style={reviewScreenStyles.buttonContaineur}>
                        <View style={reviewScreenStyles.modifyButton}>
                          <TouchableOpacity onPress={() => navigation.push('ModifyReview', { book: book, review : item })}>
                            <Icon name="create-outline" size={30} color={'white'} ></Icon>
                          </TouchableOpacity>
                        </View>
                        <View style={reviewScreenStyles.deleteButton}>
                          <TouchableOpacity onPress={deleteReviewUser}>
                            <Icon name="trash-outline" size={30} color={'white'} ></Icon>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </>
                  }
                </>
              }
          </View>
        </View>

        <View style={reviewScreenStyles.reviewContentContaineur}>
          <Text style={reviewScreenStyles.contentReview}>
            {item.content}
          </Text>
        </View>

        <View style= {{marginTop: 40, marginBottom: 10, alignItems: 'center'}}>
          <Text style= {{fontSize: 30}}>
            Commentaires 
          </Text>
        </View>

        <TouchableOpacity style={reviewScreenStyles.buttonAdd} onPress={() => { navigation.navigate('CommentForm', { review: item });}}>
          <Text style={reviewScreenStyles.sectionbutton}>Ajouter un commentaire</Text>
        </TouchableOpacity>
        
      </ScrollView>
    );
  }

};
export default ReviewCard;
