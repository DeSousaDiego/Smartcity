// Home.js
import React, { useState, useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View} from 'react-native';
import Item from '../components/Item';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { cardStyle } from '../styles/styles';
import BookCard from '../components/BookCard';
import { fetchBookData } from '../store/dataBaseLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function HomeScreen() {
  const [selectedId, setSelectedId] = useState();
  const navigation = useNavigation();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const books = useSelector(state => state.books.books);
  const token = useSelector(state => state.auth.token);
  const topRatedBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 10);

  useEffect(() =>{
    fetchBookData(dispatch, token);
  }, [])
    // Utiliser useFocusEffect pour réactiver le bouton lorsque l'écran est en focus
  useFocusEffect(
      useCallback(() => {
        // Réactiver le bouton lorsqu'on revient à cet écran
        setButtonDisabled(false);
      }, [])
    );
    const handlePress = (item) => {
      // Vérifier si le bouton est désactivé
      if (!isButtonDisabled) {
        // Désactiver le bouton après le press
        setButtonDisabled(true);
        
        // Naviguer vers l'écran 'Book' avec les informations du livre sélectionné
        navigation.push('Book', { book: item });
  
        // Mettre à jour l'ID de l'élément sélectionné
        setSelectedId(item.isbn);
      }
    };
  
    // Fonction pour le rendu de chaque élément de la liste
    const renderItem = ({ item }) => (
      <Item
        item={item}
        onPress={() => handlePress(item)}
        isSelected={item.isbn === selectedId}
        cardComponent={BookCard}
      />
    );

  return (
    <>
    <View style={{ backgroundColor: '#354F52', alignItems: 'center', justifyContent: 'center', paddingTop : 40, paddingBottom : 20 }}>
    <Text style={{ color: 'white', fontSize: 28, fontFamily: 'Oswald_700Bold'}}>Oeuvres du moment</Text>
  </View>
    <SafeAreaView style={cardStyle.container }>
      {/* Ajoutez un en-tête centré avec la couleur de fond et le texte souhaités */}

      <FlatList
        data={topRatedBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.isbn}
        extraData={selectedId}
      />
    </SafeAreaView>
    </>
  );
}


export default HomeScreen;
