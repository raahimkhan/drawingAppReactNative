import { useFonts } from 'expo-font';

const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'SFProDisplayBold': require('../assets/fonts/SFProDisplayBold.otf'),
    'SFProDisplayRegular': require('../assets/fonts/SFProDisplayMedium.otf'),
    'SFProDisplayMedium': require('../assets/fonts/SFProDisplayRegular.otf')
  });
  return fontsLoaded;
};

export default useLoadFonts;
