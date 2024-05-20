
// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FIREBASE_DB } from './FirebaseConfig'; // Make sure to import your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';

const Reinfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { region, category } = route.params;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping object to convert interface category names to database type names
  const categoryMap = {
    'الأكل الشعبي': 'الطعام',
    'الزي التقليدي': 'الأزياء',
    'النقوش': 'النقش',
    'العرضات والفلكلور': 'الرقص',
  };

  // Function to get the collection name based on the region
  const getCollectionName = (region) => {
    switch (region) {
      case 'الرياض': return 'Map_Riyadh';
      case 'مكة المكرمة': return 'Map_Makkah';
      case 'الحدود الشمالية': return 'Map_Northern Borders ';
      case 'الجوف': return 'Map_Al-Jawf';
      case 'نجران': return 'Map_Najran';
      case 'جازان': return 'Map_Jizan';
      case 'المدينة المنورة': return 'Map_Madinah';
      case 'حائل': return 'Map_Hail';
      case 'القصيم': return 'Map_Al-Qassim';
      case 'تبوك': return 'Map_Tabuk';
      case 'الشرقية': return 'Map_Eastern Region';
      case 'عسير': return 'Map_Asir';
      case 'الباحة': return 'Map_Al-Bahah';
      default: return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionName = getCollectionName(region);

      if (!collectionName) {
        console.error('Invalid region');
        setLoading(false);
        return;
      }

      const dbType = categoryMap[category];
      if (!dbType) {
        console.error('Invalid category');
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(FIREBASE_DB, collectionName),
          where('Type', '==', dbType)
        );

        const querySnapshot = await getDocs(q);
        const results = [];

        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });

        setData(results);
      } catch (error) {
        console.error('Error fetching data: ', error);
        Alert.alert('Error', `Failed to fetch data: ${error.message}`);
      }

      setLoading(false);
    };

    fetchData();
  }, [region, category]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <FontAwesome5 name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.selectedRegionTitle}>{category} في منطقة {region}</Text>
        {data.length > 0 ? (
          data.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.title}>{item.Name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Image 
                source={{ uri: item.Image }}
                style={styles.image}
              />
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No data available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0C8',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 10,

  },
  selectedRegionTitle: {
    fontSize: 22,
    top: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    marginTop:-22,
    marginBottom:60,
    
  },
  item: {
    backgroundColor: '#9DBABB',
    padding: 20,
    marginVertical: 40,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight:'bold',
    textAlign: 'center',
    marginVertical: 10,
    
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  type: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    fontStyle: 'italic',
    color: '#999',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  noData: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#999',
  },
});

export default Reinfo;
