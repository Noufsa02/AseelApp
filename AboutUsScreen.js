// AboutUsScreen.js
import React, { useState } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'; // import FontAwesome

const AboutUsScreen = ({ navigation }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const toggleTopic = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  return(
         <ScrollView style={styles.container}>
      <Text style={styles.title}>مرحبًا بكم في "أصيل"</Text>
      <Image source={require('./assets/logo - Copy.png')} style={styles.logo} />

      <TouchableOpacity onPress={() => toggleTopic('mission')} style={styles.topicButton}>
        <View style={styles.topicHeader}>
          <Text style={styles.topicTitle}>رسالتنا</Text>
          <Icon name={selectedTopic === 'mission' ? "angle-up" : "angle-down"} size={24} color="#649BA2" />
        </View>
        {selectedTopic === 'mission' && (
          <View style={styles.topicContent}>
            <Text style={styles.text}>
              نحن في "أصيل" نعمل جاهدين لإلقاء الضوء على التراث السعودي، بكل ما يحمله من أصالة وعراقة، خصوصًا تلك الجوانب الخفية التي غالبًا ما تغيب عن أنظار وسائل الإعلام الرئيسية. نؤمن بأن كل جزء من التراث السعودي هو كنز يستحق الحفاظ عليه واستكشافه، ونسعى لجعل هذه الكنوز في متناول الجميع، بطريقة تجمع بين الإبداع والتكنولوجيا.
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleTopic('goal')} style={styles.topicButton}>
        <View style={styles.topicHeader}>
          <Text style={styles.topicTitle}>هدفنا</Text>
          <Icon name={selectedTopic === 'goal' ? "angle-up" : "angle-down"} size={24} color="#649BA2" />
        </View>
        {selectedTopic === 'goal' && (
          <View style={styles.topicContent}>
            <Text style={styles.text}>
              ليس فقط الحفاظ على التراث، بل إعادة تعريف طريقة استكشافه وتجربته. من خلال الأرشفة الرقمية التفاعلية، يتيح "أصيل" للمستخدمين فرصة فريدة للغوص في عمق التاريخ والثقافة السعودية. نريد لكل شخص أن يعيش تجربة تعليمية ممتعة وملهمة، تمزج بين العمق التاريخي والحداثة التكنولوجية.
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => toggleTopic('features')} style={styles.topicButton}>
        <View style={styles.topicHeader}>
          <Text style={styles.topicTitle}>ما يميزنا</Text>
          <Icon name={selectedTopic === 'features' ? "angle-up" : "angle-down"} size={24} color="#649BA2" />
        </View>
        {selectedTopic === 'features' && (
          <View style={styles.topicContent}>
            <Text style={styles.text}>
              تجربة فريدة من نوعها: نقدم رحلة عبر الزمن تتيح لكم التفاعل مع الماضي بأساليب الحاضر
            </Text>
            <Text style={styles.text}>
              تعليم وترفيه: يجمع "أصيل" بين التعليم والترفيه من خلال محتوى غني وتفاعلي
            </Text>
            <Text style={styles.text}>
              حفظ التراث: نسهم في حماية الثقافة السعودية من خلال الأرشفة الرقمية لكنوزها الثقافية.
            </Text>
          </View>

        )}

      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      {/* <Image source={require('./assets/logo - Copy.png')} style={styles.logo} /> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    backgroundColor: '#EDE0C8',
  },
  title: {
    fontSize: 26,
    paddingTop: 50,
    marginBottom: 100,
    fontWeight: 'bold',
    color: '#649BA2',
    textAlign: 'center',
  },
  logo: {
    width: 330,
    height: 330,
    marginTop: -230,
    marginBottom: 0,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  topicButton: {
    marginHorizontal: 22,
    marginVertical: 10,
    borderBottomWidth:3,
    borderColor: '#649BA2',
    borderRadius: 5,
    padding: 10,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  topicTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#649BA2',
    flexDirection: 'row-reverse',
  },
  topicContent: {
    backgroundColor: '#9DBABB',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: '#000',
    fontSize: 18,
    lineHeight: 28,
    textAlign:'right',
    
  },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 20,
    zIndex: 10,
  },
});

export default AboutUsScreen;
