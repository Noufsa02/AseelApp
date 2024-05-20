import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const UsageGuideScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>دليل الاستخدام</Text>
      </View>
      <Swiper style={styles.wrapper} showsButtons={true} >
        <View style={styles.slide}>
          <Image source={require('./assets/guide_image1.jpg')} style={styles.image} />
          <Text style={styles.titlecaption}>استكشف التراث</Text>
          <Text style={styles.caption}>ابدأ رحلتك في اكتشاف تفاصيل التراث السعودي مع تطبيق أصيل</Text>
        </View>
        <View style={styles.slide}>
          <Image source={require('./assets/guide_image2.jpg')} style={styles.image} />
          <Text style={styles.titlecaption}>اطلب المعلومات</Text>
          <Text style={styles.caption}>استخدم الكاميرا لالتقاط صورة واحصل على معلومات فورية حول الآثار، المواقع الأثرية، والتراث العمراني.</Text>
        </View>
        <View style={styles.slide}>
          <Image source={require('./assets/guide_image3.jpg')} style={styles.image} />
          <Text style={styles.titlecaption}>مشاركة التجارب</Text>
          <Text style={styles.caption}>شارك تجاربك واستمتع بمشاهدة تجارب الآخرين عبر صفحة المجتمع التفاعلية.</Text>
        </View>
        <View style={styles.slide}>
          <Image source={require('./assets/guide_image4.jpg')} style={styles.image} />
          <Text style={styles.titlecaption}>ابدأ الآن</Text>
          <Text style={styles.caption}> ابدأ رحلتك في عالم أصيل، حيث يلتقي التاريخ والتكنولوجيا لخلق تجربة استثنائية</Text>
        </View>
      </Swiper>
      <TouchableOpacity
  onPress={() => navigation.navigate('NavigationBar')}
  style={styles.skipButton}
>
  <Text style={styles.skipText}>تخطي</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0C8',
  },
  header: {
    backgroundColor: '#EDE0C8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#649BA2',
    marginTop:20,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // #5D1B20
    
  },
  image: {
    width: 300,
    height: 300,
  },
  titlecaption:{
    fontSize: 18,
    marginTop: 30,
    textAlign: 'center',
  },
  caption: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 40,              
    left: 10,             
    padding: 8,          
    backgroundColor: 'transparent' 
  },
  skipText: {
    color: 'gray',       
    fontSize: 16          
  }
});

export default UsageGuideScreen