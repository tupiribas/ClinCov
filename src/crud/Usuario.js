import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from '../Connection';

function Usuario() {

    const [nome, setNome] = useState(null);

    useEffect(() => {
        alert('oi');
        async function Dados() {
            firebase.database().ref('usuarios/1/nome').set('Tupi');
        }
        Dados();
        
    }, []);

    return (
        <View>
            <View>
                <Text>{nome}</Text>
            </View>
        </View>
    )
}

export default Usuario;