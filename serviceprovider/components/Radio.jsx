import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import {MaterialIcons} from "@expo/vector-icons"

const Radio = ({options, checkedValue, onChange, style}) => {
  return (
    <View style={[styles.container, style]}>
      {options.map((option)=>{
        let active = checkedValue ==option.value
        return (<TouchableOpacity style={active? [styles.radio, styles.activeRadio]: styles.radio} onPress={()=>{
            onChange(option.value)
        }}
        key={option.value}
        >
            <MaterialIcons name={active?'radio-button-checked': 'radio-button-unchecked'}
           size={24}
           color={active?'#7F00FF':'#64748b'} 
            />
            <Text style={active?[styles.text, styles.activeText]:styles.text}>{option.label}</Text>
        </TouchableOpacity>)
      })}
    </View>
  )
}

export default Radio

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    radio:{
        height: 60,
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        paddingHorizontal: 15,
        borderRadius: 15
    },
    text:{
         fontSize: 16,
         marginLeft: 15,
        //  color:'#6b7280'
    },
    activeRadio: {
        backgroundColor: '#7F00FF' + '11'
    },
    activeText: {
        color: '#374151'
    }
})