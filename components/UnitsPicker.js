import React, { Component } from 'react'
import { View, StyleSheet,Platform } from 'react-native'
import {Picker} from '@react-native-community/picker'

export default function UnitsPicker({unitsSystem, setUnitsSystem}){
    
    return (
        <View style={styles.unitsSystem}>
            <Picker 
                selectedValue={unitsSystem} 
                onValueChange={(Item)=>setUnitsSystem(Item)} 
                mode="dropdown" 
                itemStyle={{fontSize: 12}}
            >

                <Picker.Item label="°C" value="metric"/>
                <Picker.Item label="°F" value="imperial"/>
            </Picker>
        </View>
    )    
}

const styles = StyleSheet.create(
    {
        unitsSystem: {
            position: 'absolute',
            ...Platform.select({
                ios: {
                    top: -20
                },
                android: {
                    top: 20,
                }
            }), 
            left: 20,
            height:50,
            width: 100,
        }
    }
)
