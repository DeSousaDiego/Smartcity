import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton({ navigation,color, style }) {
  return (
    <TouchableOpacity
      style={{justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft : 15, style}} // Utilisez la propriété style ici
      onPress={() => navigation.goBack()}
    >
      <Icon name="chevron-back-sharp" size={30} color={color} />
    </TouchableOpacity>
  );
}

export default BackButton;
