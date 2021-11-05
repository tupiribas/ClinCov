import * as React from 'react';
import { Button, View, Text } from 'react-native';

function Perfil({ navegacao }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Perfil</Text>
      <Button
        title="Voltar para o Início"
        onPress={() => navegacao.navigate('Home')}
      />
    </View>
  );
}

export default Perfil;
