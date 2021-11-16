import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Input, Text, CheckBox } from 'react-native-elements';

import firebase from '../Connection';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default class Cadastro extends Component {

    state = {
        nome: '',
        idade: '',
        temperaturaCorporal: '',
        periodoComTosse: '',
        periodoComDorCabeca: '',
        isEstadosUnidos: false,
        isItalia: false,
        periodoVisitouPais: '',
        statusPaciente: 'Liberado',
        isValidacaoCadastro: false,
        email: '',
        numeroTelefoneSeguro: '71'+'',
        senha: '',
    };

    // Cadastrar pessoa
    cadastro = async () => {
        const { nome, idade, temperaturaCorporal, periodoComTosse, periodoComDorCabeca, periodoVisitouPais, numeroTelefoneSeguro, email, senha } = this.state;

        let keyDB = firebase.database().ref().child('user').push().key;

        try {
            let userPaisVisitado = null;

            const userName = await firebase.database()
                .ref('user/' + keyDB + '/nome').set(nome);
            const userIdade = await firebase.database()
                .ref('user/' + keyDB + '/idade').set(idade);
            const userTempCorporal = await firebase.database()
                .ref('user/' + keyDB + '/temperatura-corporal').set(temperaturaCorporal);
            const userPeriodoTosse = await firebase.database()
                .ref('user/' + keyDB + '/periodo-com-tosse').set(periodoComTosse);
            const userPeriodoDorCabeca = await firebase.database()
                .ref('user/' + keyDB + '/periodo-com-dor-de-cabeca').set(periodoComDorCabeca);
            const userPeriodoVisitouPais = await firebase.database()
                .ref('user/' + keyDB + '/periodo-visitou-pais').set(periodoVisitouPais);
            const userNumeroTelefoneSeguro = await firebase.database()
                .ref('user/' + keyDB + '/numero-telefone-seguro').set(numeroTelefoneSeguro);
            
            // Cadastrando um email e senha
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    console.log("Usuario: " + user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    console.log(errorCode + "\n");
                    console.log(errorMessage + "\n");
                });

            // Valida a bandeira do pais
            if (this.state.isEstadosUnidos) {
                userPaisVisitado = await firebase.database()
                    .ref('user/' + keyDB + '/pais-visitado').set('Estados Unidos');
            }
            else if (this.state.isItalia) {
                userPaisVisitado = await firebase.database()
                    .ref('user/' + keyDB + '/pais-visitado').set('Italia');
            }
            // Validação do status do paciente
            if (this.state.temperaturaCorporal >= 38 && (this.state.isEstadosUnidos || this.state.isItalia)) {
                this.setState({ statusPaciente: 'Quarentena' });
                userStatusPaciente = await firebase.database()
                    .ref('user/' + keyDB + '/status-paciente').set(this.state.statusPaciente);
            }
            else {
                userStatusPaciente = await firebase.database()
                    .ref('user/' + keyDB + '/status-paciente').set(this.state.statusPaciente);
            }
        
            this.setState({ isValidacaoCadastro: true})
            console.log(userName + "\n");
            console.log(userIdade + "\n");
            console.log(userTempCorporal + "\n");
            console.log(userPaisVisitado + "\n");
            console.log(userPeriodoTosse + "\n");
            console.log(userPeriodoDorCabeca + "\n");
            console.log(userPeriodoVisitouPais + "\n");
            console.log(userNumeroTelefoneSeguro);
            console.log(userEmail + "\n");
            console.log(userSenha + "\n");
        } 
        catch (erro) {
            console.log("ERRO CODE.:002 >>>" + erro);
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.formulario}>

                    <View style={{display: 'flex', alignItems: 'center', paddingTop: 180, height: 'auto'}}>
                    <Text style={{color: '#00FF7F', 
                            fontSize: 30}}>Informe seus dados</Text>
                    </View>
                    <Input
                        value={this.state.nome}
                        placeholder="Nome"
                        onChangeText={nome => this.setState({ nome })}
                    />

                    <Input
                        value={this.state.idade}
                        placeholder="Idade"
                        onChangeText={idade => this.setState({ idade })}
                    />

                    <Input
                        value={this.state.temperaturaCorporal}
                        placeholder="Temperatura atual (°C)"
                        onChangeText={temperaturaCorporal => this.setState({ temperaturaCorporal })}
                    />
                    
                    <Input
                        value={this.state.periodoComTosse}
                        placeholder="Período com tosse (em dias)"
                        onChangeText={periodoComTosse => this.setState({ periodoComTosse })}
                    />

                    <Input
                        value={this.state.periodoComDorCabeca}
                        placeholder="Período com dor de cabeça (em dias)"
                        onChangeText={periodoComDorCabeca => this.setState({ periodoComDorCabeca })}
                    />

                    <View style={{display: 'flex', alignItems: 'center', margin: 10, height: 'auto'}}>
                        <Text style={{color: '#00FF7F', fontSize: 20}}>
                            <br/>Se visitou e há quantas semanas os seguintes países: 
                            <br/>Itália, China, Indonésia, Portugal e Eua
                        </Text>
                    </View>

                    <View style={styles.paisesVisitados}>
                        <CheckBox
                            title="EUA"
                            checkedIcon="check"
                            uncheckedIcon="square-o"
                            checkedColor="green"
                            uncheckedColor="red"
                            checked={this.state.isEstadosUnidos}
                            onPress={() => {
                                if (!this.state.isEstadosUnidos) {
                                this.setState({isEstadosUnidos:true});
                                this.setState({isItalia:false});
                                } 
                                else {this.setState({isEstadosUnidos:false})}
                            }}
                        />
                        <CheckBox
                            title="ITÁLIA"
                            checkedIcon="check"
                            uncheckedIcon="square-o"
                            checkedColor="green"
                            uncheckedColor="red"
                            checked={this.state.isItalia}
                            onPress={() => {
                                if (!this.state.isItalia) {
                                this.setState({isItalia:true});
                                this.setState({isEstadosUnidos:false});
                                } 
                                else {this.setState({isItalia:false})}
                            }}
                        />
                    </View>

                    <Input
                        value={this.state.periodoVisitouPais}
                        placeholder="Quantidade de semanas"
                        onChangeText={periodoVisitouPais => this.setState({ periodoVisitouPais })}
                    />

                    <Input
                        value={this.state.email}
                        placeholder="E-mail"
                        onChangeText={email => this.setState({ email })}
                    />  
                    
                    <Input
                        value={this.state.senha}
                        placeholder="Senha"
                        onChangeText={senha => this.setState({ senha })}
                    />

                    <Input
                        value={this.state.numeroTelefoneSeguro}
                        placeholder="Número de celular de confiança"
                        onChangeText={numeroTelefoneSeguro => this.setState({ numeroTelefoneSeguro })}
                    />
                    
                    {/*Mensagem de validação*/ 
                        this.state.isValidacaoCadastro ? 
                        <Text>{this.state.nome}, foi cadastrado com sucesso!</Text> : 
                        null
                    }
                </View>

                <View style={{padding: 20}}> 
                    <Button title="Cadastrar" onPress={() => {this.cadastro}}/>
                </View>
            </View>
        );
    }
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
