import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Header } from '../componentes/Header';

import { useEffect, useState} from 'react';
import { OrderProps } from '../componentes/Order';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../componentes/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText, Clipboard, User, Trash } from "phosphor-react-native";
import { CardDetails } from '../componentes/CardDetails';
import { Input } from '../componentes/Input';
import { Button} from '../componentes/Button';
import { Alert } from 'react-native';


type RouteParams = {
  orderId: string;
}

type OrderDetails = OrderProps & {
  observacao: string;
  solution: string;
  closed: string;
};

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState('');
  const [observacao, setObservacao] = useState('');
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const navigation = useNavigation();
  const { colors } = useTheme();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  //Função para fechar chamados
  function handleOrderClose(){
    if(!solution){
      return  Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação');
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      status: 'closed',
      solution,
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Solicitação', 'Solicitação encerrada');
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Solicitação', 'Não foi possivel encerrar a solicitação');
    });

  }

  //Salvando Observação
  function handleOrderUpdate(){
    if(!observacao){
      return  Alert.alert('Solicitação', 'Informe uma obserção');
    }

    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      observacao,
    })
    .then(() => {
      Alert.alert('Observação', 'Observação atualizada');
    })
    .catch((error) => {
      console.log(error);
      Alert.alert('Observação', 'Não foi possivel atualizar a observação');
    });

  }

  //criando logica de exclusão
  function handleOrderDelete(){
    Alert.alert("Remover item", "Tem certeza que deseja remover esse item?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          firestore()
          .collection<OrderFirestoreDTO>('orders')
          .doc(orderId)
          .delete()
          .then(() => {
            Alert.alert('Exclusão', 'Registro excluido com sucesso');
            navigation.goBack();
          })
          .catch((error) => {
            console.log(error);
            Alert.alert('Exclusão', 'Não foi possivel excluir esse registro');
          });
        },
      },
    ]);
    
  }
  


  useEffect(() => {
      firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { classificacao, nome, cpf, precao, frequencia, saturacao, observacao, status, solution, created_at, closed_at} = doc.data();
        setObservacao(observacao)
        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          classificacao, 
          nome,  
          cpf, 
          precao, 
          frequencia, 
          saturacao, 
          observacao, 
          status,
          solution,
          when: dateFormat(created_at),
          closed
        });

        setIsLoading(false);

      })

  }, []);

      if(isLoading){
        return <Loading />
      }

  return (
    <VStack flex={1} bg="#cffafe"> 
    <ScrollView>  
        <Header title="solicitação" isTrashButton={order.status === "open"} trashButtom={handleOrderDelete}/>

        <HStack bg="#fffaf0" justifyContent="center" p={4}>
            {
              order.status === 'closed'
                ? <CircleWavyCheck size={22} color={colors.black} />
                : <Hourglass size={22} color={colors.gray[700]} />
            }

            <Text
              fontSize="sm"
              color={order.status === 'closed' ? colors.gray[700] : colors.gray[700]}
              ml={2}
              textTransform="uppercase"
            >

              {order.status === 'closed' ? 'finalizado' : 'em andamento'}
            </Text>
        </HStack>

            
                
                  <CardDetails
                    title='PACIENTE'
                    description={`Paciente: ${order.nome} 
Freq: ${order.frequencia} Pressão: ${order.precao} Sat: ${order.precao}`}
                    icon={User}
                    footer={order.when}
                  />

                <CardDetails
                  title='DESCRIÇÃO'
                  description={order.status === "closed" &&order.observacao}
                  icon={Clipboard}
                  children={
                    observacao && order.status === "open" &&(
                      <Input
                        placeholder="Descrição da solução"
                        onChangeText={setObservacao}
                        value={observacao}
                        textAlignVertical="top"
                        multiline
                        h={24}
                      />
                    )
                  }
                />

                <CardDetails
                  title="DESENVOLTURA"
                  description={order.solution}
                  icon={CircleWavyCheck}
                  footer={order.closed && `Encerrado em ${order.closed}`}
                  children={
                    order.status === "open" && (
                      <Input
                        placeholder="Descrição da solução"
                        onChangeText={setSolution}
                        textAlignVertical="top"
                        multiline
                        h={24}
                      />
                    )
                  }
                />
                
      </ScrollView>

      {order.status === "open" && (
        <>
          <Button title="Encerrar solicitação" onPress={handleOrderClose} m={5} />
          <Button title="Salvar Update" onPress={handleOrderUpdate} m={5} mt={0}/>
        </>
      )}
    </VStack>
  );
}