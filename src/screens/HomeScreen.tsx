import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStore} from '../store/store';
import CoffeeData from '../data/CoffeeData';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {StatusBar} from 'react-native';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: any, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};



const HomeScreen = ({navigation}:any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeData),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffe, setSetsortedCoffe] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const ListRef:any = useRef<FlatList>()
  const tabBarHeight = useBottomTabBarHeight();


  const searchCoffee = (search:string) => {
    if(search != ''){
      ListRef?.current?.scrollToOffset({
        animated:true,
        offset:0,
      });
      setCategoryIndex({index:0,category:categories[0]});
      setSetsortedCoffe([...CoffeeList.filter((item:any)=>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )])
    }
  }

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated:true,
      offset:0,
    });
    setCategoryIndex({index:0,category:categories[0]});
    setSetsortedCoffe([...CoffeeList]);
    setSearchText('');
  }



  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryGreyHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* app header */}
        <HeaderBar />

        <Text style={styles.ScreenTitle}>
          Find the best {'\n'}coffee for you
        </Text>

        {/* search input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {searchCoffee(searchText)}}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              style={styles.InputIcon}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee...."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchCoffee(text)
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText?.length > 0 ? (
            <TouchableOpacity onPress={()=>{resetSearchCoffee()}}>
              <CustomIcon name='close' size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} 
                style={styles.InputIcon}
              />
            </TouchableOpacity>
          ):(
            <></>
          )}
        </View>

        {/* category scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              style={styles.CategoryScrollViewContainer}
              key={index.toString()}>
              <TouchableOpacity
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated:true,
                    offset:0
                  })
                  setCategoryIndex({index: index, category: categories[index]});
                  setSetsortedCoffe([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}
                style={styles.CategoryScrollViewItem}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoryIndex.index === index
                      ? {color: COLORS.primaryOrangeHex}
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoryIndex.index === index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* coffee flatelist */}
        <FlatList 
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee found</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffe}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>{
            return <TouchableOpacity onPress={()=> {
              navigation.push('Details',{
                index:item.index,
                id:item.id,
                type:item.type
              });
            }}>
              <CoffeeCard
               id={item.id}
               name={item.name}
               roasted={item.roasted}
               imagelink_square={item?.imagelink_square}
               special_ingredient={item.special_ingredient}
               prices={item.prices[2]}
               average_rating={item.average_rating}
               type={item.type}
               index={item.index}
               buttonPressHandler={()=>{}} 
              />
            </TouchableOpacity>
          }}
        />

        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        {/* Beans flate list */}
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.FlatListContainer,{marginBottom:tabBarHeight}]}
          keyExtractor={(item)=>item.id}
          renderItem={({item})=>{
            return <TouchableOpacity onPress={()=> {
              navigation.push('Details',{
                index:item.index,
                id:item.id,
                type:item.type
              });
            }}>
              <CoffeeCard
               id={item.id}
               name={item.name}
               roasted={item.roasted}
               imagelink_square={item.imagelink_square}
               special_ingredient={item.special_ingredient}
               prices={item.prices[2]}
               average_rating={item.average_rating}
               type={item.type}
               index={item.index}
               buttonPressHandler={()=>{}} 
              />
            </TouchableOpacity>
          }}
        />

          

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    padding: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  FlatListContainer:{
    gap:SPACING.space_20,
    paddingVertical:SPACING.space_20,
    paddingHorizontal:SPACING.space_30
  },
  EmptyListContainer:{
    width:Dimensions.get('window').width - SPACING.space_30*2,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:SPACING.space_36*3
  },
  CoffeeBeansTitle:{
    fontSize:FONTSIZE.size_18,
    marginLeft:SPACING.space_30,
    marginTop:SPACING.space_20,
    fontFamily:FONTFAMILY.poppins_medium,
    color:COLORS.secondaryLightGreyHex,
  }
});

export default HomeScreen;
