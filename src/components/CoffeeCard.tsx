import {Dimensions, ImageBackground, ImageProps, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
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
        start={{x:0,y:0}}
        end={{x:1,y:1}}
        style={styles.CardLinearGradientContainer}
        colors={[COLORS.primaryGreyHex,COLORS.primaryBlackHex]}
    >
        <ImageBackground source={imagelink_square}
        resizeMode='cover'
            style={styles.CardImage}
        >
            <View style={styles.CardRatingContainer}>
                <CustomIcon name='star' color={COLORS.primaryOrangeHex} size={FONTSIZE.size_18}/>
                <Text style={styles.CardRatinText}>
                    {average_rating}
                </Text>
            </View>
        </ImageBackground>
        <Text>{name}</Text>
        <Text>{special_ingredient}</Text>
        <View>
            <Text>$ <Text>{prices.price}</Text></Text>
        </View>
        <TouchableOpacity>
            <BGIcon color={COLORS.primaryWhiteHex} name={'add'} BGColor={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_10}
            />
        </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    CardLinearGradientContainer:{

    },
    CardImage:{
        width:CARD_WIDTH,
        height:CARD_WIDTH,
        borderRadius:BORDERRADIUS.radius_20,
        marginBottom:SPACING.space_15,
        overflow:'hidden', 
    },
    CardRatingContainer:{

    },
    CardRatinText:{

    }
});



export default CoffeeCard;

