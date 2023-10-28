import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';

export function CreateScreen(): JSX.Element {
  const {t} = useTranslation();

  return (
    <View>
      <Text>{t('sudoku')}</Text>
    </View>
  );
}
