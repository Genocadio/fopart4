import { Platform } from "react-native";
const theme = {
    colors: {
      primary: '#0366d6',
      textPrimary: '#000', // Default text color
      textSecondary: '#555', // Secondary text color
      backgroundWhite: '#fff',
      separator: 'black'
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
    fonts: {
        main: Platform.select({
          ios: 'Roboto',  
          android: 'Sans-serif', 
          default: 'Arial font', 
        }),
    },
    spacing: {
      small: 5,
      medium: 10,
      large: 20,
      // add other spacing values here
    }
  }
  
  export default theme;
  