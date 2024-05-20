import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const categories = [
  { name: "الزي التقليدي", id: 1, description: "تعرف على الأزياء التقليدية والشعبية", image: require('./assets/clothes2.jpg') },
  { name: "الأكل الشعبي", id: 2, description: "استكشف الأطعمة والمأكولات التقليدية", image: require('./assets/Cook.jpg') },
  { name: "العرضات والفلكلور", id: 3, description: "تعرف على الرقصات الشعبية والتراثية", image: require('./assets/Dance.jpg') },
  { name: "النقوش", id: 4, description: "استعرض النقوش والزخارف الفنية", image: require('./assets/sdo.jpg') }
];

const CategoryPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { region } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>منطقة {region}</Text>
      <View style={styles.gridContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.gridItem}
            onPress={() => navigation.navigate('Reinfo', { region, category: category.name })}
          >
            <Image source={category.image} style={styles.gridImage} />
            <Text style={styles.gridText}>{category.name}</Text>
            <Text style={styles.description}>{category.description}</Text>
            <FontAwesome5 name="chevron-right" size={18} color="#FFF" style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EDE0C8',
  },
  header: {
    fontSize: 30,
    marginTop:25,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop:70,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    backgroundColor: '#9DBABB',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  gridText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  description: {
    fontSize: 14,
    color: '#111',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
  arrow: {
    alignSelf: 'flex-end',
    marginTop: 10
  },
  backButton: {
    position: 'absolute', 
    top: 55, 
    left: 10, 
    zIndex: 10,
  },
});

export default CategoryPage;


