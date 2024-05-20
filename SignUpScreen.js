import React, { useState, useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
//import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioGroup from 'react-native-radio-buttons-group';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, query, where, getDocs, collection } from 'firebase/firestore';

const SignUpScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const radioButtons = useMemo(() => ([
    { id: '1', label: 'ذكر', value: 'male' },
    { id: '2', label: 'أنثى', value: 'female' }
  ]), []);

  const [selectedId, setSelectedId] = useState();

  const auth = FIREBASE_AUTH;

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleConfirm = (date) => {
    setBirthday(date.toISOString().split('T')[0]);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUpPress = async () => {
    // Reset previous error messages
    setFirstNameError('');
    setLastNameError('');
    setBirthdayError('');
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate each field
    if (!firstName) {
      setFirstNameError('عليك ملأ هذا الحقل');
    }
    if (!lastName) {
      setLastNameError('عليك ملأ هذا الحقل');
    }
    if (!birthday) {
      setBirthdayError('عليك ملأ هذا الحقل');
    }
    if (!email) {
      setEmailError('الرجاء إدخال إيميلك الشخصي');
    } else if (!validateEmail(email)) {
      setEmailError('الرجاء إدخال إيميل بصيغة صحيحة');
    }
    if (!phoneNumber) {
      setPhoneNumberError('الرجاء إدخال رقم هاتفك');
    }
    if (!password) {
      setPasswordError('الرجاء تعيين كلمة سر');
    } else if (!validatePassword(password)) {
      setPasswordError('كلمة السر يجب أن تحتوي على 8 أحرف وتشمل حروف كبيرة وصغيرة ورمز واحد على الأقل');
    }
    if (!confirmPassword) {
      setConfirmPasswordError('الرجاء إعادة كتابة الرقم السري');
    }
    if (!selectedId) {
      setError('الرجاء تحديد النوع');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError('الرجاء التأكد من تطابق كلمتي المرور');
      return; // Exit early if passwords don't match
    }

    // Early return if there are any errors
    if (firstNameError || lastNameError || birthdayError || emailError || phoneNumberError || passwordError || confirmPasswordError || error) {
      return;
    }

    setLoading(true);

    try {
      // Check if email or phone number already exists in Firestore
      const emailQuery = query(collection(FIREBASE_DB, 'users'), where('email', '==', email));
      const phoneQuery = query(collection(FIREBASE_DB, 'users'), where('phoneNumber', '==', phoneNumber));

      const emailQuerySnapshot = await getDocs(emailQuery);
      const phoneQuerySnapshot = await getDocs(phoneQuery);

      if (!emailQuerySnapshot.empty) {
        setEmailError('This email address is already in use. Please try another.');
        setLoading(false);
        return;
      }

      if (!phoneQuerySnapshot.empty) {
        setPhoneNumberError('This phone number is already in use. Please try another.');
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
        firstName,
        lastName,
        birthday,
        phoneNumber,
        email,
        gender: selectedId === '1' ? 'male' : 'female',
      });

      navigation.navigate('UsageGuide');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email address is already in use. Please try another.');
      } else {
        setError(error.message); 
      }
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.headerText}>إنشاء حساب</Text>

        <TextInput
          style={styles.input}
          placeholder="الإسم الأول"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="الاسم الأخير"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

        <View style={styles.dateInputContainer}>
          {/* <Text style={styles.dateText}>تاريخ الميلاد</Text> */}
?            {/* <Icon name="calendar" size={20} color="#999" style={styles.dateIcon} /> */}
            {/* <Icon name="calendar" size={20} color="#999" style={styles.dateIcon} />
            <TextInput
              style={styles.dateInput}
              placeholder="تاريخ الميلاد"
              placeholderTextColor="#999"
              value={birthday}
              editable={false}
            />
          </TouchableOpacity> */}
        </View>
        {birthdayError ? <Text style={styles.errorText}>{birthdayError}</Text> : null}

        <DateTimePicker
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <TextInput
          style={styles.input}
          placeholder="الايميل"
          placeholderTextColor="#999"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="رقم الجوال"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="الرقم السري"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="تأكيد الرقم السري"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <View style={styles.genderInputContainer}>
          <Text style={styles.genderText}>الجنس:</Text>
          <View style={styles.radioGroupContainer}>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={setSelectedId}
              selectedId={selectedId}
              layout="row"
            />
          </View>
        </View>
        {error && !selectedId ? <Text style={styles.errorText}>{error}</Text> : null}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>إنشاء حساب</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignInPress}>
          <Text style={styles.signInText}>هل لديك حساب بالفعل؟ قم بتسجيل الدخول</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0C8',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDE0C8',
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#9DBABB',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 120,
    borderTopRightRadius: 0,
    padding: 20,
  },
  input: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    
  },
  dateInputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput: {
    backgroundColor: '#F6F6F6',
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    fontSize: 16,
    color: '#333',
  },
  datePickerButton: {
   flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateIcon: {
    marginRight: 10,
    flexDirection: 'row',
  },
  dateText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  genderInputContainer: {
    backgroundColor: '#F6F6F6',
    width: '100%',
    height:'7.5%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  genderText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: -50,
    marginRight:30,
  },
  signInText: {
    color: '#333',
    marginTop: 20,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5D1B20',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 40,
    marginTop: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  radioGroupContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    borderRadius: 10,
    width: '100%',
  },
});

export default SignUpScreen;



