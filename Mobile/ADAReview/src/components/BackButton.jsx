import { TouchableOpacity } from "react-native";
import { bookDetailsstyles } from "../styles/styles";
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton({ navigation,color }) {
  return (
    <TouchableOpacity
      style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft : 15}} // Utilisez la propriété style ici
      onPress={() => navigation.goBack()}
    >
      <Icon name="chevron-back-sharp" size={30} color={color} />
    </TouchableOpacity>
  );
}

export default BackButton;
