import { View, TouchableOpacity, Image, Text, ScrollView,SafeAreaView,FlatList } from 'react-native';
import { bookDetailsstyles } from '../styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { AirbnbRating } from '@rneui/themed';

function BookDetails({book, navigation}){
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
    const toggleDescriptionVisibility = () => {
        setIsDescriptionVisible(!isDescriptionVisible);
      };
    return(
        <>
        <View style={bookDetailsstyles.content}>
          <Image source={book.image} style={bookDetailsstyles.image} />
          <Text style={bookDetailsstyles.title}>{book.title}</Text>
          <Text style={bookDetailsstyles.author}>{book.author}</Text>
          <Text style={bookDetailsstyles.info}>{book.genre}</Text>
          <Text style={bookDetailsstyles.info}>Illustré par {book.illustrator}</Text>
          <Text style={bookDetailsstyles.info}>Edité par {book.publishing_house},</Text>
          <Text style={bookDetailsstyles.info}>{book.country}</Text>
          <View style={bookDetailsstyles.ratingContainer}>
          <AirbnbRating showRating={false} size={20} defaultRating={book.rating} />
            <Text style={bookDetailsstyles.rating}>({book.nbRatings} ratings)</Text>
          </View>
          <View style={bookDetailsstyles.summaryContainer}>
              <TouchableOpacity onPress={toggleDescriptionVisibility}>
                <Text style={bookDetailsstyles.summaryTitle}>Description <Icon
                  name={isDescriptionVisible ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#354F52"
                /></Text>
                
              </TouchableOpacity>
              {isDescriptionVisible && (
                <Text style={bookDetailsstyles.summaryText}>{book.description}</Text>
              )}
            </View>
          <View style={bookDetailsstyles.reviewContainer}>
            <TouchableOpacity style={bookDetailsstyles.addButton} onPress={() => navigation.push("ReviewForm", {book : book})}>
              <Text style={bookDetailsstyles.addText}>Nouvelle critique +</Text>
            </TouchableOpacity>
          </View>

          
        </View>
        
      </>
    );
}
export default BookDetails;