import * as React from 'react';
import { Button, View } from 'react-native';
import { Text } from 'react-native-elements';

function Home({ navigation }) {

  return (
    <View style={{alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: 10,
                  flexDirection: 'column'}}>

      <Text h1 style={{color: '#00FF7F'}}>ClinCov</Text>
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
    </View>
  );
}

export default Home;
