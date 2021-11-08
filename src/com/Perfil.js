import React, { useEffect, useState} from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { Input, Text } from 'react-native-elements';

import firebase from '../../src/Connection';

export default function Perfil({ navigation }) {

  const [nome, setNome] = useState('Carregando...');
  const [idade, setIdade] = useState('Carregando...');
  const [tempoDorCabeca, setTempoDorCabeca] = useState('Carregando...');
  const [temperaturaCorporal, setTemperaturaCorporal] = useState('Carregando...');
  const [periodoTosse, setPeriodoTosse] = useState('Carregando...');
  const [qntVisitaAoPais, setQntVisitaAosPaises] = useState('Carregando...');
  const [statusSaude, setStatusSaude] = useState('Carregando...');
  const [paisVisitado, setPaisVisitado] = useState('Carregando...');

  function status(situacao) {
    if (situacao == 'Liberado') {
      return <Text h4 style={{color: '#00FF7F',backgroundColor: '#E0EEEE', borderRadius: 5, paddingHorizontal: 10}}>
        {statusSaude}</Text>
    }
    else if (situacao == 'Contaminado') {
        return <Text h4 style={{color: '#FF6347', backgroundColor: '#FFC1C1', borderRadius: 5, paddingHorizontal: 10}}>
          {statusSaude}</Text>
    }
  }

  function bandeiraPaisVisitado(pais) {
    if (pais == 'Estados Unidos') {
      return <Image
        style={styles.bandeiraVisitada}
        source={{
          uri: 'https://img.icons8.com/emoji/48/000000/us-outlying-islands-emoji.png',
        }}
      />
    }
    else if (pais == 'Italia') {
      return <Image
        style={styles.bandeiraVisitada}
        source={{
          uri: 'https://img.icons8.com/emoji/48/000000/italy-emoji.png',
        }}
      />
    }
  }

  useEffect(() => {
    async function Dados() {
        // Olheiro da nossa database
        firebase.database().ref('user/1/nome').once('value', (snapshot) => { 
          setNome(snapshot.val()); 
        });
        firebase.database().ref('user/1/idade').once('value', (snapshot) => { 
          setIdade(snapshot.val()); 
        });
        firebase.database().ref('user/1/temperatura-corporal').once('value', (snapshot) => { 
          setTemperaturaCorporal(snapshot.val()); 
        });
        firebase.database().ref('user/1/periodo-com-dor-de-cabeca').once('value', (snapshot) => { 
          setTempoDorCabeca(snapshot.val()); 
        });
        firebase.database().ref('user/1/periodo-com-tosse').once('value', (snapshot) => { 
          setPeriodoTosse(snapshot.val()); 
        });
        firebase.database().ref('user/1/quantidade-de-visitas').once('value', (snapshot) => { 
          setQntVisitaAosPaises(snapshot.val()); 
        });
        firebase.database().ref('user/1/status').once('value', (snapshot) => { 
          setStatusSaude(snapshot.val()); 
        });
        firebase.database().ref('user/1/pais-visitado').once('value', (snapshot) => { 
          setPaisVisitado(snapshot.val()); 
        });
     }

    Dados();
}, []);
  
  return (
    <View style={styles.body}>

      <View style={styles.informacoesPerfil}>
        <View style={styles.textoContainer}>
          <Text h2>{nome}</Text>
        </View>
        <View style={styles.textoContainer}>
          <Text>
            {status(statusSaude)}
          </Text>
        </View>
          <Image
              style={styles.fotoPerfil}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbBB7lpCQ9jxZicGf_mxDgMCI11UQkeD6SVDZTAzPHpZyuPshxbxTDQKIGTYoEsmmGqSM&usqp=CAU',
              }}
          />
        </View>
        
        <View style={styles.container}>
          <Text h4>{idade} anos</Text>
        </View>

      <View style={{paddingVertical: 10}}></View>

      {/*Tabela Saúde*/}
      <View style={styles.informacoesSaude}>
          <View style={styles.separaTextoInfoSaude}>
            <Text>Dor de cabeça</Text>
            <Text>{tempoDorCabeca} dias</Text>
          </View>
        </View>

      <View style={{paddingVertical: 5}}></View>
      <View style={styles.informacoesSaude}>
          <View style={styles.separaTextoInfoSaude}>
            <Text>Temperatura corporal</Text>
            <Text>{temperaturaCorporal} °C</Text>
          </View>
      </View>

      <View style={{paddingVertical: 5}}></View>
      <View style={styles.informacoesSaude}>
          <View style={styles.separaTextoInfoSaude}>
            <Text>Tossindo</Text>
            <Text>{periodoTosse} dias</Text>
          </View>
      </View>

      <View style={{paddingVertical: 10}}></View>
      
      {/*Tabela status país*/}
      <View style={styles.informacoesDoPais}>
        <View style={styles.separaTextoInfoSaude}>
          <Text>Bandeira</Text>
          <Text>{bandeiraPaisVisitado(paisVisitado)}</Text>
        </View>
        <View style={styles.separaTextoInfoSaude}>
          <Text>Visitou</Text>
          <Text>{qntVisitaAoPais} vezes</Text>
        </View>
      </View>

      <View style={{paddingVertical: 15}}>
        <Button
          title="Voltar para o Início"
          onPress={() =>  navigation.navigate('Home')}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  container: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 15,
    width: 200,
    fontSize: 200,
  },
  textoContainer: {
    paddingHorizontal: 15
  },
  informacoesPerfil: {
    alignItems: 'center',
    paddingTop: 80,
  },
  fotoPerfil: {
    borderRadius: 100,
    borderColor: '#00FF7F',
    borderTopWidth: 1,
    borderLeftWidth: 5,
    borderWidth: 10,
    width: 200,
    height: 200,
  },
  informacoesSaude: {
    flexDirection: 'column',
    backgroundColor: '#00FF7F',
    width: 300,
    padding: 15,
    borderRadius: 8,
  },
  separaTextoInfoSaude: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  informacoesDoPais: {
    flexDirection: 'row',
    backgroundColor: '#00FF7F',
    width: 'auto',
    padding: 15,
    borderRadius: 8,
  },
  bandeiraVisitada: {
    width: 30,
    height: 30,
  },

});