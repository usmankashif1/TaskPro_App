import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GStyle from '../style/GStyle';
import theme from '../style/Constants';
import responsive from '../Components/Responsive';
import { SIZES } from '../Constants/theme';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
const AnimatedCheckbox = ({ completed, onPress }) => {
  const scale = useRef(new Animated.Value(completed ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: completed ? 1 : 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [completed]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.checkbox}>
        <Animated.View style={{ transform: [{ scale }] }}>
          {completed && <Ionicons name="checkmark" size={16} color="#fff" />}
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const toggleModal = () => {
    setModalVisible(prev => !prev);
    setSearchText('');
    setFilteredNotes([]);
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('tasks')
        .orderBy('timestamp', 'desc')
        .onSnapshot(
          snapshot => {
            const fetched = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAllNotes(fetched);

            const completed = fetched.filter(n => n.completed);
            const pending = fetched.filter(n => !n.completed);
            setCompletedCount(completed.length);

            if (filter === 'all') setNotes(fetched);
            else if (filter === 'completed') setNotes(completed);
            else setNotes(pending);
          },
          error => console.error(error),
        );

      return () => unsubscribe();
    }, [filter]),
  );

  const toggleTaskCompletion = async (id, currentStatus) => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('tasks')
        .doc(id)
        .update({ completed: !currentStatus });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNote = id => {
    Alert.alert(
      'Delete Task',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await firestore()
                .collection('users')
                .doc(auth().currentUser.uid)
                .collection('tasks')
                .doc(id)
                .delete();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('tasks')
        .orderBy('timestamp', 'desc')
        .get();

      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllNotes(fetched);

      const completed = fetched.filter(n => n.completed);
      const pending = fetched.filter(n => !n.completed);
      setCompletedCount(completed.length);

      if (filter === 'all') setNotes(fetched);
      else if (filter === 'completed') setNotes(completed);
      else setNotes(pending);
    } catch (error) {
      console.error('Refresh error:', error);
    }
    setRefreshing(false);
  };

  const handleSearch = text => {
    setSearchText(text);
    if (!text.trim()) {
      setFilteredNotes([]);
      return;
    }
    const filtered = notes.filter(
      note =>
        note.title.toLowerCase().includes(text.toLowerCase()) ||
        note.Description?.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredNotes(filtered);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();

      navigation.replace('Login');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };

  return (
    <SafeAreaView
      style={[
        GStyle.container,
        { backgroundColor: theme.color.background, flex: 1 },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={{ fontSize: SIZES.h1, color: 'white', fontWeight: '500' }}>
          Tasks
        </Text>
        <View style={styles.searchLogoutContainer}>
          <TouchableOpacity
            style={styles.HeaderIconContainer}
            onPress={handleLogout}
          >
            <AntDesign
              name="logout"
              size={responsive.fontSize(22)}
              color={theme.color.iconColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.HeaderIconContainer}
            onPress={toggleModal}
          >
            <Ionicons
              name="search-sharp"
              size={responsive.fontSize(22)}
              color={theme.color.iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          Pending: {allNotes.filter(n => !n.completed).length}
        </Text>
        <Text style={styles.statusText}>Completed: {completedCount}</Text>
      </View>

      <View style={styles.filterRow}>
        {['all', 'completed', 'incomplete'].map(type => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilterButton,
            ]}
            onPress={() => setFilter(type)}
          >
            <Text
              style={[
                styles.filterText,
                filter === type && styles.activeFilterText,
              ]}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        {notes.length === 0 ? (
          <View style={styles.imgContainer}>
            <Image
              style={styles.emptyImg}
              source={require('../assets/images/empty.png')}
            />
            <Text style={styles.subHeading}>Create your first task!</Text>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: responsive.margin(100) }}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            renderItem={({ item }) => (
              <View style={styles.notesContainer}>
                <View style={styles.row}>
                  <AnimatedCheckbox
                    completed={item.completed}
                    onPress={() =>
                      toggleTaskCompletion(item.id, item.completed)
                    }
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text
                      numberOfLines={1}
                      style={[GStyle.heading, styles.title]}
                    >
                      {item.title}
                    </Text>
                    {item.Description !== '' && (
                      <Text
                        numberOfLines={1}
                        style={[GStyle.subHeading, styles.Description]}
                      >
                        {item.Description}
                      </Text>
                    )}
                    <Text style={styles.date}>{item.createdAt}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteNote(item.id)}>
                    <Ionicons
                      name="trash-outline"
                      size={responsive.fontSize(22)}
                      color="#ff4d4d"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddTask')}
        style={styles.AddButton}
      >
        <Entypo
          name="plus"
          size={responsive.fontSize(40)}
          color={theme.color.iconColor}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={handleSearch}
              autoFocus
            />
            <FlatList
              data={filteredNotes}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.notesContainer}
                  onPress={() => {
                    toggleModal();
                    navigation.navigate('ViewNote', { note: item });
                  }}
                >
                  <Text
                    style={[GStyle.heading, styles.title]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  {item.Description !== '' && (
                    <Text
                      style={[GStyle.subHeading, styles.Description]}
                      numberOfLines={1}
                    >
                      {item.Description}
                    </Text>
                  )}
                  <Text style={styles.date}>{item.createdAt}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                searchText !== '' && (
                  <Text
                    style={{
                      color: 'white',
                      marginTop: 20,
                      textAlign: 'center',
                    }}
                  >
                    No results found.
                  </Text>
                )
              }
            />
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={{ color: 'white', fontWeight: '600' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsive.margin(10),
  },
  HeaderIconContainer: {
    backgroundColor: '#3B3B3B',
    height: responsive.uniform(45),
    width: responsive.uniform(45),
    borderRadius: responsive.borderRadius(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsive.margin(10),
  },
  statusText: { color: '#fff', fontSize: responsive.fontSize(14) },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: responsive.margin(10),
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#333',
  },
  activeFilterButton: { backgroundColor: '#555' },
  filterText: { color: '#bbb', fontSize: responsive.fontSize(12.5) },
  activeFilterText: { color: '#fff', fontWeight: '600' },
  imgContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  emptyImg: {
    height: responsive.width(250),
    width: responsive.width(250),
    alignSelf: 'center',
  },
  subHeading: {
    color: 'white',
    fontSize: responsive.fontSize(14),
    marginTop: 10,
  },
  notesContainer: {
    width: '100%',
    borderRadius: 8,
    marginVertical: responsive.margin(7),
    padding: responsive.padding(12),
    backgroundColor: '#3B3B3B',
    // minHeight: responsive.height(90),
    paddingBottom: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    height: 22,
    width: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#252525',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // <- Add this
  },
  title: { color: 'white', fontSize: responsive.fontSize(17) },
  Description: {
    color: '#e8e6e6',
    fontSize: responsive.fontSize(11.5),
    top: 4,
  },
  date: { color: '#bdbcbb', fontSize: responsive.fontSize(10.5), top: 9 },
  AddButton: {
    height: responsive.height(70),
    width: responsive.width(65),
    position: 'absolute',
    bottom: responsive.margin(35),
    right: responsive.margin(35),
    backgroundColor: theme.color.background,
    elevation: 4,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  searchInput: {
    backgroundColor: '#444',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#555',
    borderRadius: 8,
  },
  searchLogoutContainer: {
    flexDirection: 'row',
    gap: responsive.margin(20),
  },
});
