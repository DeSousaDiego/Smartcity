import React from 'react';
import Navigation from './src/Navigation/Navigation'; // Importez le composant Navigation
import { Allan_400Regular, Allan_700Bold } from '@expo-google-fonts/allan';
import { useFonts,Oswald_200ExtraLight,Oswald_300Light,Oswald_400Regular,Oswald_500Medium,Oswald_600SemiBold,Oswald_700Bold,} from '@expo-google-fonts/oswald';
import { Inter_900Black, Inter_800ExtraBold, Inter_400Regular} from '@expo-google-fonts/inter';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const App = () => {

  let [fontsLoaded] = useFonts({
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold,
    Allan_400Regular,
    Allan_700Bold,
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_400Regular
  });
  return (
    <>
      <Provider store={store}>
        <Navigation/>
      </Provider>
    </>
        );
};

export default App;