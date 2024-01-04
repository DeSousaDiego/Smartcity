import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import SearchItem from "../components/SearchItem";
import { cardStyle, searchStyles} from "../styles/styles";
import { useNavigation } from "@react-navigation/native";
import { SearchBar } from '@rneui/themed';
import { Button, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookData, fetchUsersData } from "../store/dataBaseLoader";

function SearchScreen() {
  const [searchType, setSearchType] = useState("accounts");
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const accounts = useSelector(state => state.users.users);
  const books = useSelector(state => state.books.books);

  useEffect(() =>{
    searchType === "accounts" ? fetchUsersData(dispatch) : fetchBookData(dispatch);
  }, []);
  const ItemSeparator = () => (
    <View
      style={{
        height: 3,
        backgroundColor: "#CED0CE", // Couleur de la séparation
      }}
    />
  );
  const filteredResults = searchType === "accounts"
    ? accounts.filter(account => account.username.toLowerCase().includes(searchText.toLowerCase()))
    : books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));

  const handleSearchTypeChange = (type) => {
      // Réinitialise le texte lors du changement de type de recherche
      setSearchText("");
      setSearchType(type);
    };
  return (
    <SafeAreaView style ={searchStyles.topContainer}>
      {/* Utilisez le composant SearchBar avec les propriétés nécessaires */}
      <SearchBar
        placeholder="Recherche"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
        containerStyle={searchStyles.container}
        inputContainerStyle= {searchStyles.input}/>
      
        <View style={{ flexDirection: "row", alignSelf :'flex-end'}}>
        <Button
          icon={<Icon name="book" type="font-awesome" color={searchType === "books" ? "#FFFFFF" : "black"} />}
          onPress={() => handleSearchTypeChange("books")}
          type={searchType === "books" ? "solid" : "clear"}
          buttonStyle={{ backgroundColor: searchType === "books" ? "#354F52" : "transparent" }}
        />

        <Button
          icon={<Icon name="user" type="font-awesome" color={searchType === "accounts" ? "#FFFFFF" : "black"} />}
          onPress={() => handleSearchTypeChange("accounts")}
          type={searchType === "accounts" ? "solid" : "clear"}
          buttonStyle={{ backgroundColor: searchType === "accounts" ? "#354F52" : "transparent" }}
        />
      </View>

    <FlatList
      data={filteredResults}
      keyExtractor={(item) => (searchType === "accounts" ? item.id.toString() : item.isbn.toString())}
      renderItem={({ item }) => (
        <SearchItem
          item={item}
          searchType={searchType}
          onPress={() => {
            if (searchType === "accounts") {
              navigation.push('Profile', { account: item });
            } else {
              navigation.push('Book', { book: item });
            }
          }}
          textColor="black"
        />
      )}
      style={{backgroundColor :'#F0F0EC'}}
      ItemSeparatorComponent={ItemSeparator}
    />

    </SafeAreaView>
  );
}
export default SearchScreen;
