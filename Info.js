import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Info = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.logoContainer}>
          <Image 
            source={require('./assets/logo.png')}
            style={styles.logo}
          />
        </View>
        
        <View style={styles.heritageTitleContainer}>
          <Image 
            source={require('./assets/qasrmasmac.jpg')} 
            style={styles.heritageImage}
          />
          <Text style={styles.Title}>قصر المصمك</Text>
        </View>

        <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>

        
        {/* Description Text */}
        <Text style={styles.descriptionText}>
        بني عام 1895 بأمر الأمير عبد الرحمن بن ضبعان عند توليه إمارة الرياض أيام محمد بن عبد الله بن علي الرشيد. يقع المصمك في
         الركن الشمالي الشرقي للرياض القديمة قرب السور القديم، ويقع الآن في حي الديرة. وقد كان المصمك مسرحاً لمعركة فتح الرياض التي استعاد فيها عبد العزيز آل سعود مدينة الرياض لأسرته 
         آل سعود من آل رشيد عام 1902 م، والتي لا تزال آثار تلك المعركة الشهيرة موجودة على باب القصر والمتمثلة في سنة الرمح الذي قُتل به ابن عجلان (عامل بن رشيد على الرياض) حيث لا يزال الباب الأصلي موجوداً إلى وقتنا الحاضر. 
        و يعتبر قصر المصمك من مباني الرياض الأصلية القليلة الباقية إلى الوقت الحاضر، ويحوي الآن بداخله متحفاً مخصصاً لتوحيد المملكة العربية السعودية على يد عبد العزيز بن عبد الرحمن آل سعود. 
        والمصمك أو المسمك يعني البناء السميك المرتفع الحصين، وقد استخدم كمستودع للذخيرة والأسلحة بعد سقوط الرياض عام 1902 تحت الحكم السعودي، وبقي يستخدم لهذا الغرض إلى أن تقرر تحويله إلى معلم تراثي        
        </Text>
      </ScrollView>


      <View style={styles.navigationBar}>
        <TouchableOpacity>
          <FontAwesome5 name="user" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="map" size={24} color="#F9E4D4" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Community')}>
          <FontAwesome5 name="comments" size={24} color="#F9E4D4" />
          </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="home" size={24} color="#F9E4D4" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
  },
  backButton: {
    position: 'absolute', 
    top: 55, 
    left: 10, 
    zIndex: 10, 
  },
  scrollView: {
    marginHorizontal: 10,
  },
  navBar: {
    width: '100%',
    padding: 0, 
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0, 
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 600,
    height: 250,
    resizeMode: 'contain',
  },
  heritageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 0,
  },
  heritageImage: {
    width: 200, 
    height: 140, 
    borderRadius: 10, 
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'right',
    marginLeft: 40,         //  space between image and title
  },
  descriptionText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 25,
    backgroundColor: '#c6ebe0', 
    padding: 8, 
    borderRadius: 20, 
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#8F181C',
    paddingVertical: 10,
    //borderTopWidth: 1,
    //borderTopColor: '#cccccc',
  },
});

export default Info;