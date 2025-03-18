import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import styles from './welcome.style'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const welcome = () => {
  const navigation = useNavigation();
  return (

    <View>
      <View style={{paddingBottom:30}}>
      <Text style={styles.welcomeText('black', 30, 0)}>
          <LinearGradient
            colors={['#2d388a', '#00aeef']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ paddingHorizontal: 5, borderRadius: 5 }}
          >
            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>FazTudo</Text>
          </LinearGradient>
        </Text>

        <Text style={styles.welcomeText2('black', 11, 0)}>TUDO EM SUAS MÃOS</Text>
      </View>
    </View>
  )
}

export default welcome