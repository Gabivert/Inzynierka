import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';

export default function CustomButton({ title, onPress, className }) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            className={`py-3 px-5 rounded-lg bg-custom-dark ${className}`}>
            <Text className="text-black font-bold text-lg text-center">{title}</Text>
        </TouchableOpacity>
    );
}
