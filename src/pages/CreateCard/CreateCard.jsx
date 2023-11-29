import {styles} from './style';
import {theme} from '../../global/styles/theme';

import React, {useState} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Button} from '../../components/Button/Button';
import {SelectPicker} from '../../components/SelectPicker/SelectPicker';
import {Input} from '../../components/Input/Input';

export const CreateCard = () => {
  const [name, setName] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation();

  const handleName = event => {
    setName(event.nativeEvent);
    setErrorMessage('');
  };
  return (
    <View style={styles.createCardContainer}>
      <View style={styles.header}>
        <View style={styles.titleIconBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={28}
              color={theme.header.icon}
              style={styles.eyeMask}
            />
          </TouchableOpacity>
          <Text style={styles.titlePage}>Criar Card</Text>
        </View>
        <Button title="Criar" width={80} height={35} />
      </View>
      <View style={styles.formBox}>
        <Input
          value={name}
          errorMessage={errorMessage}
          placeholder="Insira um nome"
          label="Nome"
          onChangeText={handleName}
          containerStyle={{marginBottom: 20}}
        />
        <SelectPicker
          label="Categoria"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
      </View>
    </View>
  );
};
