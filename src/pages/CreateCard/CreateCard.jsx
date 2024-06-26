import {styles} from './style';
import {theme} from '../../global/styles/theme';

import React, {useState, useContext} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {createCardSchema} from '../../schema/playbookCreateCard.schema';

import {PlaybookContext} from '../../context/PlaybookContext';
import {UserContext} from '../../context/UserContext';

import Feather from 'react-native-vector-icons/Feather';

import {Button} from '../../components/Button/Button';
import {SelectPicker} from '../../components/SelectPicker/SelectPicker';
import {Input} from '../../components/Input/Input';
import {TextArea} from '../../components/TextArea/TextArea';

export const CreateCard = () => {
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const {userId} = useContext(UserContext);
  const {createPlaybook} = useContext(PlaybookContext);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(createCardSchema),
  });

  const onSubmit = formData => {
    const formDataWithCategoryAndUserId = {
      ...formData,
      categoryId: selectedValue,
      userId: userId,
    };
    createPlaybook(formDataWithCategoryAndUserId, setLoading, reset);
  };

  return (
    <View style={styles.createCardContainer}>
      <View style={styles.header}>
        <View style={styles.titleIconBox}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather
              name="arrow-left-circle"
              size={28}
              color={theme.header.icon}
              style={styles.eyeMask}
            />
          </TouchableOpacity>
          <Text style={styles.titlePage}>Criar Card</Text>
        </View>
        <Button
          title="Criar"
          aditionalStyle={styles.button}
          loading={loading}
          type="submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <View style={styles.formBox}>
        <Controller
          control={control}
          render={({field}) => (
            <Input
              value={field.value}
              errorMessage={errors.name?.message}
              isError={errors.name?.message}
              placeholder="Insira um nome"
              label="Nome"
              onChangeText={field.onChange}
              containerStyle={styles.input}
            />
          )}
          name="name"
          defaultValue=""
        />
        <SelectPicker
          label="Categoria"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <Controller
          control={control}
          render={({field}) => (
            <TextArea
              value={field.value}
              errorMessage={errors.description?.message}
              isError={errors.description?.message}
              placeholder="Escreva algo"
              label="Texto"
              onChangeText={field.onChange}
              containerStyle={styles.textArea}
            />
          )}
          name="description"
          defaultValue=""
        />
      </View>
    </View>
  );
};
