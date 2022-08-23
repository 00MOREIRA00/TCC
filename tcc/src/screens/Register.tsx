import { useState} from 'react';
import { Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { VStack } from 'native-base';
import { Header } from '../componentes/Header';
import { Input } from '../componentes/Input';
import { Button } from '../componentes/Button';


export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [classificacao, setClassificacao] = useState("");
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [precao, setPrecao] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [saturacao, setSaturacao] = useState("");
    const [observacao, setObservacao] = useState("");
  
    const navigation = useNavigation();
  
    function handleNewOrderRegister() {
      if (!classificacao || !nome || !cpf || !precao || !frequencia || !saturacao || !observacao) {
        return Alert.alert("Registrar", "Preencha todos os campos.");
      }
  
      setIsLoading(true);
  
      firestore()
        .collection("orders")
        .add({
          classificacao,
          nome,
          cpf,
          precao,
          frequencia,
          saturacao,
          observacao,
          status: "open",
          created_at: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Alert.alert("Solicitação", "Solicitação registrada com sucesso.");
          navigation.goBack();
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          return Alert.alert(
            "Solicitação",
            "Não foi possível registrar o pedido."
          );
        });
    }
  
    return (
      <VStack flex={1} p={6} bg="#cffafe">
        <Header title="Nova Solicitação" />
          <ScrollView>
            <Input
              placeholder="Classificação de Risco"
              mt={4}
              onChangeText={setClassificacao}
            />
      
            <Input
              placeholder="Nome"
              mt={4}
              onChangeText={setNome}
            />

            <Input
              placeholder="CPF"
              mt={4}
              onChangeText={setCpf}
            />

            <Input
              placeholder="Preção"
              mt={4}
              onChangeText={setPrecao}
            />

            <Input
              placeholder="Frequencia Cardiaca"
              mt={4}
              onChangeText={setFrequencia}
            />

            <Input
              placeholder="Saturação"
              mt={4}
              onChangeText={setSaturacao}
            />

            <Input
              placeholder="Descrição do problema"
              mt={5}
              flex={1}
              multiline
              textAlignVertical="top"
              onChangeText={setObservacao}
            />
      
            <Button
              title="Cadastrar"
              mt={5}
              isLoading={isLoading}
              onPress={handleNewOrderRegister}
            />
        </ScrollView>
      </VStack>
    );
  }
  