import React, { useEffect, useState} from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Button, Image, Pressable, Modal, Alert } from 'react-native';
import { Input, Text, CheckBox } from 'react-native-elements';

import firebase from '../../src/Connection';

export default function Perfil() {

  // Dados
  const [nome, setNome] = useState('Carregando...');
  const [idade, setIdade] = useState('Carregando...');
  const [tempoDorCabeca, setTempoDorCabeca] = useState('Carregando...');
  const [temperaturaCorporal, setTemperaturaCorporal] = useState('Carregando...');
  const [periodoTosse, setPeriodoTosse] = useState('Carregando...');
  const [qntVisitaAoPais, setQntVisitaAosPaises] = useState('Carregando...');
  const [statusSaude, setStatusSaude] = useState('Carregando...');
  const [paisVisitado, setPaisVisitado] = useState('Carregando...');

  // CheckBox Paises
  const [isEstadosUnidos, setIsEstadosUnidos] = useState(false);
  const [isItalia, setIsItalia] = useState(false);

  // Modal 
  const [modalEditarDados, setModalEditarDados] = useState(false);

  // Mudar a estilização do status do usuário (Quarentena ou Liberado)
  function status(situacao) {
    if (situacao == 'Liberado') {
      return <Text h4 style={{color: '#00FF7F',backgroundColor: '#E0EEEE', borderRadius: 5, paddingHorizontal: 10}}>
        {statusSaude}</Text>
    }
    else if (situacao == 'Quarentena') {
        return <Text h4 style={{color: '#FF6347', backgroundColor: '#FFC1C1', borderRadius: 5, paddingHorizontal: 10}}>
          {statusSaude}</Text>
    }
  }

  // mudar a bandeira do pais visitado
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

  // Observar os dados do usuário
  useEffect(() => {
    async function Dados() {
        let id = '-MoBWTs6vhhJ-JY3Md50';
        // Olheiro da nossa database
        firebase.database().ref('user/' + id + '/nome').once('value', (snapshot) => { 
          setNome(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/idade').once('value', (snapshot) => { 
          setIdade(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/temperatura-corporal').once('value', (snapshot) => { 
          setTemperaturaCorporal(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/periodo-com-dor-de-cabeca').once('value', (snapshot) => { 
          setTempoDorCabeca(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/periodo-com-tosse').once('value', (snapshot) => { 
          setPeriodoTosse(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/periodo-visitou-pais').once('value', (snapshot) => { 
          setQntVisitaAosPaises(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/status-paciente').once('value', (snapshot) => { 
          setStatusSaude(snapshot.val()); 
        });
        firebase.database().ref('user/' + id + '/pais-visitado').once('value', (snapshot) => { 
          setPaisVisitado(snapshot.val()); 
        });
     }

    Dados();
}, []);

  // Observar a mudança de temperatura
  useEffect(() => {
    async function AtualizarStatusSaude() {
      if (temperaturaCorporal >= 38) {
        setStatusSaude("Quarentena");
        console.log("Quarentena");
      }
      else {
        setStatusSaude("Liberado");
        console.log("Liberado");
      }
    }

    AtualizarStatusSaude();

  }, [temperaturaCorporal]);

  // Editar os dados do usuário
  const editar = async () => {
    try {
      let userStatusPaciente = null;
      let userPaisVisitado = null;

      let keyDB = '-MoBWTs6vhhJ-JY3Md50';
      const userName = await firebase.database()
          .ref('user/' + keyDB + '/nome').set(nome);
      const userIdade = await firebase.database()
          .ref('user/' + keyDB + '/idade').set(idade);
      const userTempCorporal = await firebase.database()
          .ref('user/' + keyDB + '/temperatura-corporal').set(temperaturaCorporal);
      const userPeriodoTosse = await firebase.database()
          .ref('user/' + keyDB + '/periodo-com-tosse').set(periodoTosse);
      const userPeriodoDorCabeca = await firebase.database()
          .ref('user/' + keyDB + '/periodo-com-dor-de-cabeca').set(tempoDorCabeca);
      const userPeriodoVisitouPais = await firebase.database()
          .ref('user/' + keyDB + '/periodo-visitou-pais').set(qntVisitaAoPais);

      // Valida a bandeira do pais
      if (isEstadosUnidos) {
        setPaisVisitado("Estados Unidos");
        userPaisVisitado = await firebase.database()
            .ref('user/' + keyDB + '/pais-visitado').set('Estados Unidos');
        console.log(paisVisitado);
      }
      else if (isItalia) {
        setPaisVisitado("Italia")
          userPaisVisitado = await firebase.database()
              .ref('user/' + keyDB + '/pais-visitado').set('Italia');
        console.log(paisVisitado);
      }
      // Validação do status do paciente
      userStatusPaciente = await firebase.database()
          .ref('user/' + keyDB + '/status-paciente').set(statusSaude);

      console.log(userName + "\n");
      console.log(userIdade + "\n");
      console.log(userTempCorporal + "\n");
      console.log(userPaisVisitado + "\n");
      console.log(userPeriodoTosse + "\n");
      console.log(userPeriodoDorCabeca + "\n");
      console.log(userPeriodoVisitouPais + "\n");
      console.log(userStatusPaciente);
      console.log(temperaturaCorporal);
      console.log("Status", statusSaude);
    }
    catch (erro) {
      console.log("ERRO CODE.:003 >>>" + erro);
    }
  }
  
  return (
    <View style={styles.body}>

      {/* Resto do app*/}
      <View style={styles.informacoesPerfil}>
        <View style={styles.textoContainer}>
          <Text h2>{nome}</Text>
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
          <Text>{paisVisitado}</Text>
        </View>
        <View style={styles.separaTextoInfoSaude}>
          <Text>Visitou por</Text>
          <Text>{qntVisitaAoPais} semanas</Text>
        </View>
      </View>

      {/*Modal - Editar Dados*/}
      <View style={styles.modalEditarDados}>
        <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalEditarDados}
          onRequestClose={() => {
            setModalEditarDados(!modalVisible);
          }}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text h4 style={styles.modalText}>Editar os dados de {nome}</Text>
              
              {/** Formulário modal */}
              <View style={styles.containerModal}>
                <Input
                    value={nome}
                    placeholder="Nome"
                    onChangeText={nome => setNome(nome)}
                />

                <Input
                    value={idade}
                    placeholder="Idade"
                    onChangeText={idade => setIdade(idade)}
                />

                <Input
                    value={temperaturaCorporal}
                    placeholder="Temperatura atual (°C)"
                    onChangeText={temperaturaCorporal => setTemperaturaCorporal(temperaturaCorporal)}
                />
                
                <Input
                    value={periodoTosse}
                    placeholder="Período com tosse (em dias)"
                    onChangeText={periodoTosse => setPeriodoTosse(periodoTosse)}
                />

                <Input
                    value={tempoDorCabeca}
                    placeholder="Período com dor de cabeça (em dias)"
                    onChangeText={tempoDorCabeca => setTempoDorCabeca(tempoDorCabeca)}
                />

                <Text><br/>Se visitou e há quantas semanas os seguintes países: 
                    <br/>Itália, China, Indonésia, Portugal e Eua
                </Text>

                <View style={styles.paisesVisitados}>
                    <CheckBox
                        title="EUA"
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        uncheckedColor="red"
                        checked={isEstadosUnidos}
                        onPress={() => {
                            if (!isEstadosUnidos) {
                              setIsEstadosUnidos(true);
                              setIsItalia(false)
                              bandeiraPaisVisitado("Estados Unidos");
                            } 
                              else {setIsEstadosUnidos(false);
                            }
                        }}
                    />
                    <CheckBox
                        title="ITÁLIA"
                        checkedIcon="check"
                        uncheckedIcon="square-o"
                        checkedColor="green"
                        uncheckedColor="red"
                        checked={isItalia}
                        onPress={() => {
                            if (!isItalia) {
                            setIsItalia(true);
                            setIsEstadosUnidos(false);
                            bandeiraPaisVisitado("Italia")
                            } 
                            else {setIsItalia(false)}
                        }}
                    />
                  <Input
                    value={qntVisitaAoPais}
                    placeholder="Quantidade de semanas"
                    onChangeText={qntVisitaAoPais => setQntVisitaAosPaises(qntVisitaAoPais)}
                  />
                </View>
              </View>
                {/** Fim do formulário modal */}
                
              {/*Botão confirmação de edição dos dados*/}
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {editar(); setModalEditarDados(!modalEditarDados);}}
                  >
                    <Text style={styles.textStyle}>Enviar</Text>
                  </Pressable>

                  <View style={{paddingHorizontal: 5}}></View>
                  
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalEditarDados(!modalEditarDados)}
                  >
                    <Text style={styles.textStyle}>Cancelar</Text>
                  </Pressable>
                </View>
              {/*Fim do botão confirmação de edição dos dados*/}            
                
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalEditarDados(true)}
        >
          <Text style={styles.textStyle}>Editar dado</Text>
        </Pressable>
      </View>
    </View>
    {/*Fim do Modal - Editar Dados*/}

    </View>
  );

}

// Estilização
const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    alignContent: 'center'
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
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  informacoesPerfil: {
    paddingTop:50,
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
    justifyContent: 'center',
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
  
  // modalEditarDados
  modalEditarDados: {
    // Possíveis edições


  },
  containerModal: {
    display: 'flex',
    flexDirection: 'column',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingHorizontal: 30,
  },
  buttonOpen: {
    backgroundColor: "#00FF7F",
  },
  buttonClose: {
    backgroundColor: "red",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});