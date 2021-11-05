import * as React from 'react';
import { Button, View, Text } from 'react-native';

function Home({ navigation }) {
  return (
    <View style={{
         alignItems: 'center', 
         justifyContent: 'center', 
         margin: 10,
         flexDirection: 'row'}}>
      <Button
        title="Cadastro"
        onPress={() => navigation.navigate('Cadastro')}
      />
      <View style={{
         alignItems: 'center', 
         justifyContent: 'center', 
         margin: 30,
         flexDirection: 'row'}}>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Perfil')}
      />
    </View>
    </View>
  );
}

export default Home;
