import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Input, Text } from 'react-native-elements';

import Usuario from '../crud/usuario';

function Cadastro({  navigation }) {

    const [nome, setNome] = useState(null);

    return (
    <View style={styles.container}>
        <Text h1>ClinCov</Text>

        <View style={styles.container}>
            <Input
                value={nome}
                placeholder="Nome"
                onChangeText={value => setNome( value )}
            />
            
        </View>

        <View style={{margin: 20}}> 
            <Button title="Cadastrar" onPress={() => {
                Usuario().key;
            }}/>
        </View>
        
        <Button
            title="Voltar para o Início"
            onPress={() =>  navigation.navigate('Home')}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

});

export default Cadastro;
