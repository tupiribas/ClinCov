import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/com/Home';
import Cadastro from './src/com/Cadastro';
import Perfil from './src/com/Perfil';
import Login from './src/com/Login';
import BuscarPaciente from './src/com/adm/BuscarPaciente';

const Stack = createNativeStackNavigator();

function App(/*Navegador */) {
// Foi colocado o initialRouteName="Home", caso tivesse algum problema com o firebase que ele não quisesse autenticar no Login

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Buscar Paciente - QR" component={BuscarPaciente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
