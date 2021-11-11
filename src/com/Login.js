import React, { useState} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Input, Text } from 'react-native-elements';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../Connection';

function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [isValidacaoLogin, setIsValidacaoLogin] = useState(false);

    const [mensagemValidacao, setMensagemValidacao] = useState(null);

    // Cadastrar pessoa
    const login = async () => {
        try {
            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
            // Signed in
                const user = userCredential.user;
                console.log("Usuário: " + user);
                setIsValidacaoLogin(true);
            // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode + "\n" + errorMessage);
            });
        } 
        catch (erro) {
            console.log("ERRO CODE.:001 >>>" + erro);
        }
    }
    
    return (
        <View style={styles.container}>

            <View style={styles.formulario}>

                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingEnd: 30}}>
                <Text style={{color: '#00FF7F', 
                        fontSize: 45}}>Bem-vindo(a) ao ClinCov!</Text>
                </View>

                <Input
                    value={email}
                    placeholder="E-mail"
                    onChangeText={email => setEmail(email)}
                />  
                
                <Input
                    value={senha}
                    placeholder="Senha"
                    onChangeText={senha => setSenha(senha)}
                />

            </View>
            <Text>{mensagemValidacao}</Text>

            <View style={{padding: 20}}> 
                <Button title="Entrar" onPress={() => {login(); 
                    if (isValidacaoLogin) {
                        setMensagemValidacao("Tudo certo, aproveite!");
                    }
                }

                }/>
            </View>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column'
    },
    paisesVisitados: {

    },
    formulario: {
        display: 'flex',
    }

});

export default Login;