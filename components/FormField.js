import React from 'react';
import { View, Text, TextInput } from 'react-native';

const FormField = ({ title, value, handleChangeText, secureTextEntry, errorMessage, otherStyle, keyboardType }) => {
  return (
    <View className={`w-full ${otherStyle}`}>
      <Text className="text-black text-lg font-semibold">{title}</Text>
      <TextInput
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={secureTextEntry}
        className="mt-2 p-3 bg-gray-800 rounded-md text-white"
        keyboardType={keyboardType}
      />
      {errorMessage && <Text className="text-red-500 text-sm mt-1">{errorMessage}</Text>}
    </View>
  );
};

export default FormField;
