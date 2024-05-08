import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface CoffeeCardProp {
  id: string;
  name: string;
  roasted: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: any;
  average_rating: number;
  type: string;
  index: number;
  buttonPressHandler: any;
}

const CoffeeCard: React.FC<CoffeeCardProp> = ({
  id,
  name,
  roasted,
  imagelink_square,
  special_ingredient,
  prices,
  average_rating,
  type,
  index,
  buttonPressHandler,
}) => {
    
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.CardLinearGradientContainer}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
      <ImageBackground
        source={imagelink_square}
        resizeMode="cover"
        style={styles.CardImage}>
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_16}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTile}>{name}</Text>
      <Text style={styles.CardSubtile}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency} >
          $ <Text style={styles.cardPrice}>{prices.price}</Text>
        </Text>
        <TouchableOpacity onPress={()=>{}}>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name={'add'}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardLinearGradientContainer: {
    padding:SPACING.space_15,
    borderRadius:BORDERRADIUS.radius_25,
  },
  CardImage: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection:'row',
    backgroundColor:COLORS.primaryBlackRGBA,
    alignItems:'center',
    justifyContent:'center',
    gap:SPACING.space_10,
    paddingHorizontal:SPACING.space_15,
    position:'absolute',
    borderBottomLeftRadius:BORDERRADIUS.radius_20,
    borderTopRightRadius:BORDERRADIUS.radius_10,
    top:0,
    right:0
  },
  CardRatingText: {
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_14,
    lineHeight:22
  },
  CardTile:{
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_16
  },
  CardSubtile:{
    fontFamily:FONTFAMILY.poppins_light,
    color:COLORS.primaryWhiteHex,
    fontSize:FONTSIZE.size_10
  },
  CardFooterRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:SPACING.space_15
  },
  CardPriceCurrency:{
    fontFamily:FONTFAMILY.poppins_semibold,
    color:COLORS.primaryOrangeHex,
    fontSize:FONTSIZE.size_18,
  },
  cardPrice:{
    color:COLORS.primaryWhiteHex
  }
});

export default CoffeeCard;
