import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Input, Text } from 'react-native-elements';

import firebase from '../Connection'

class Cadastro extends Component {
    state = {
        Nome: '',
        Idade: '', 
        TemperaturaAtual: '',
        TempoComTosse: '',
        TempoComDorCabeca: '',
        QntSemanasNoPais: '',
    };

    constructor(props) {
        super(props);
        this.ref = firebase.collection('teste');
    }

    render() {
    <View style={styles.container}>
        <Text h1>ClinCov</Text>

        <View style={styles.container}>
            <Input
                value={this.state.Nome}
                placeholder="Nome"
                onChangeText={value => this.setState({Nome: value})}
            />

            <Input
                placeholder="Idade"
                onChangeText={value => this.setState({Idade: value})}
            />

            <Input
                placeholder="Temperatura atual"
                onChangeText={value => this.setState({TemperaturaAtual: value})}
            />
            
            <Input
            
                placeholder="Período com tosse (em dias)"
                onChangeText={value => this.setState({TempoComTosse: value})}
            />

            <Input
                placeholder="Período com dor de cabeça (em dias)"
                onChangeText={value => this.setState({TempoComDorCabeca: value})}
            />
            <Text h4><br/>Se visitou e há quantas semanas os seguintes países: 
                <br/>Itália, China, Indonésia, Portugal e Eua</Text>
            <Input
                placeholder="Quantidade de semanas"
                onChangeText={value => this.setState({QntSemanasNoPais: value})}
            />

            
        </View>

        <View style={{margin: 20}}> 
            <Button title="Cadastrar" onPress={() => {
                if ((nome && idade && temperaturaAtual && tempoComDorCabeca && qntSemanasNoPais) 
                    != null) {
                    
                }
            }}/>
        </View>
        
        <Button
            title="Voltar para o Início"
            onPress={() => navegacao.navigate('Home')}
        />
    </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

});

export default Cadastro;
