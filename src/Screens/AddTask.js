import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Foundation from 'react-native-vector-icons/Foundation';
import theme from '../style/Constants';
import GStyle from '../style/GStyle';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const { height, width } = Dimensions.get('window');

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const currentUser = auth().currentUser;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleBackButtonPress = () => {
    if (!title.trim() && !Description.trim()) {
      navigation.goBack();
    } else {
      toggleModal();
    }
  };

  const handleSavePress = async () => {
    if (!title.trim() && !Description.trim()) {
      navigation.goBack();
    } else {
      await saveNote();
    }
  };

  const saveNote = async () => {
    if (!currentUser) {
      console.log('User not logged in!');
      return;
    }
    try {
      const date = new Date();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ];

      const formattedDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      const hours = date.getHours();
      const formattedTime = `${hours % 12 || 12}:${String(date.getMinutes()).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

      const newNote = {
        title,
        Description,
        completed: false,
        createdAt: `${formattedTime}, ${formattedDate}`,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('tasks')
        .add(newNote);

      navigation.goBack();
      console.log('Task Created');

    } catch (error) {
      console.log('Error saving to Firestore:', error);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={[styles.HeaderIconContainer, { marginLeft: 0 }]}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={theme.color.iconColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.HeaderIconContainer}
          onPress={handleSavePress}
        >
          <Ionicons
            name="save-outline"
            size={22}
            color={theme.color.iconColor}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.TitleInput}
        multiline={true}
        placeholder="Task Title"
        placeholderTextColor={theme.color.textColor}
        onChangeText={val => setTitle(val)}
        value={title}
      />
      <TextInput
        style={styles.DescriptionInput}
        multiline={true}
        placeholder="Type Description..."
        placeholderTextColor={theme.color.textColor}
        onChangeText={val => setDescription(val)}
        value={Description}
      />

      <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View style={styles.ModalContainer}>
            <Foundation name="info" size={55} color="#606060" />
            <Text style={[GStyle.heading, { color:'white',fontSize: 25, marginVertical: 10 }]}>
              Save Changes!
            </Text>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={[styles.ModalButton, { backgroundColor: 'red' }]}
                onPress={() => {
                  toggleModal();
                  navigation.goBack();
                }}
              >
                <Text style={styles.ModalText}>Discard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.ModalButton, { backgroundColor: '#30BE71' }]}
                onPress={async () => {
                  await saveNote();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.ModalText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#252525',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HeaderIconContainer: {
    backgroundColor: '#3B3B3B',
    height: 45,
    width: 45,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TitleInput: {
    marginTop: 20,
    fontSize: 27,
    fontFamily: theme.Fonts.Bold,
    color: theme.color.textColor,
  },
  DescriptionInput: {
    fontSize: 16,
    fontFamily: theme.Fonts.regular,
    color: theme.color.textColor,
  },
  ModalContainer: {
    backgroundColor: '#252525',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
    height: height * 0.28,
    width: width * 0.9,
  },
  ModalButton: {
    height: height * 0.065,
    width: width * 0.32,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: height * 0.016,
    borderRadius: 5,
  },
  ModalText: {
    fontSize: 18,
    fontFamily: theme.Fonts.Semi_Bold,
    color: 'white',
  },
  ButtonContainer: {
    flexDirection: 'row',
  },
});
