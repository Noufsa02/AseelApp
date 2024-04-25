// AboutUsScreen.js
import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';  // Added TouchableOpacity here
import { FontAwesome5 } from '@expo/vector-icons';



const AboutUsScreen = ({ navigation }) => {
   return (
     <ScrollView style={styles.container}>
       {/* <Image 
         source={require('../../assets/logo.png')} 
         style={styles.logo}
         resizeMode="contain" 
   /> */}
       <Text style={styles.title}>مرحبًا بكم في "أصيل"</Text>
       <Text style={styles.text}>
         في عالم تسوده التكنولوجيا وتتسارع فيه وتيرة الحياة، يغدو الحفاظ على الهوية الثقافية تحديًا يوميًا. "أصيل" هو بوابتكم الرقمية نحو اكتشاف الكنوز الثقافية السعودية بأسلوب مبتكر وتفاعلي، يعيد ربطكم بجذوركم ويقرب المسافات بين الماضي العريق والحاضر الزاخر بالإمكانيات.
       </Text>
       <Text style={styles.heading}>رسالتنا</Text>
       <Text style={styles.text}>
         نحن في "أصيل" نعمل جاهدين لإلقاء الضوء على التراث السعودي، بكل ما يحمله من أصالة وعراقة، خصوصًا تلك الجوانب الخفية التي غالبًا ما تغيب عن أنظار وسائل الإعلام الرئيسية. نؤمن بأن كل جزء من التراث السعودي هو كنز يستحق الحفاظ عليه واستكشافه، ونسعى لجعل هذه الكنوز في متناول الجميع، بطريقة تجمع بين الإبداع والتكنولوجيا.
       </Text>
       <Text style={styles.heading}>هدفنا</Text>
       <Text style={styles.text}>
         ليس فقط الحفاظ على التراث، بل إعادة تعريف طريقة استكشافه وتجربته. من خلال الأرشفة الرقمية التفاعلية، يتيح "أصيل" للمستخدمين فرصة فريدة للغوص في عمق التاريخ والثقافة السعودية. نريد لكل شخص أن يعيش تجربة تعليمية ممتعة وملهمة، تمزج بين العمق التاريخي والحداثة التكنولوجية.
       </Text>
       <Text style={styles.heading}>ما يميزنا</Text>
       <Text style={styles.text}>
         تجربة فريدة من نوعها: نقدم رحلة عبر الزمن تتيح لكم التفاعل مع الماضي بأساليب الحاضر-
         </Text>
         <Text style={styles.text}>
         تعليم وترفيه: يجمع "أصيل" بين التعليم والترفيه من خلال محتوى غني وتفاعلي
         </Text>
         <Text style={styles.text}>
         حفظ التراث: نسهم في حماية الثقافة السعودية من خلال الأرشفة الرقمية لكنوزها الثقافية
         
       </Text>


       <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
    
     </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingTop: 5,
     backgroundColor: '#FAF6D0', 
   },

  logo: {
    width: '100%', 
    height: 350, 
    
  },
   title: {
     fontSize: 24,
     fontWeight: 'bold',
     color: '#649BA2',
     textAlign: 'center',
   },
   heading: {
     fontSize: 25,
     fontWeight: 'bold',
     color: '#649BA2',
     marginTop: 20,
     marginHorizontal: 15,
   },
   text: {
     color: 'black',
     fontSize: 18,
     lineHeight: 24,
     textAlign: 'justify',
     marginHorizontal: 20,
     marginBottom: 20,
     marginTop: 10,
     textAlign: 'center' //بشاور البنات فيها
   },
   backButton: {
    position: 'absolute', 
    top: 55, 
    left: 10, 
    zIndex: 10, 
  },
   
});

export default AboutUsScreen;