import { View, Text, SafeAreaView, ScrollView, Image, StatusBar, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';


export default function Welcome() {
    const navigation = useNavigation()
    return (
        <View className="flex-1 bg-custom-light">
            <StatusBar barStyle="dark-content"/>
            <View className="w-full justify-center items-center min-h-[85vh] px-4">
                <Text className="text-center text-5xl font-bold h-[100px]">IGJ</Text>
                <Image
                    source={require('../../assets/images/gear.png')}
                    className="max-2-[380px] w-full h-[300px]"
                    resizeMode="contain"
                />
                <View className="mt-5">
                    <Text className="text-3xl text-black text-center">Witamy w naszym systemie!</Text>
                </View>
            </View>
            <CustomButton
                    title="Zaczynamy"
                    onPress={() => navigation.navigate('Register')}
                    className="mt-10"
            />
        </View>
      )
}