import { VStack, Text, HStack, useTheme, ScrollView } from 'native-base';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Header } from '../componentes/Header';

import { useEffect, useState} from 'react';
import { OrderProps } from '../componentes/Order';
import firestore from '@react-native-firebase/firestore';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';
import { dateFormat } from '../utils/firestoreDateFormat';
import { Loading } from '../componentes/Loading';
import { CircleWavyCheck, Hourglass, DesktopTower, ClipboardText, Clipboard, User } from "phosphor-react-native";
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
  


  useEffect(() => {
      firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { classificacao, nome, cpf, precao, frequencia, saturacao, observacao, status, solution, created_at, closed_at} = doc.data();
        
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
        <Header title="solicitação"/>

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

            <ScrollView>
                
                  <CardDetails
                    title='PACIENTE'
                    description={`Paciente: ${order.nome}`}
                    icon={User}
                    footer={order.when}
                  />

                <CardDetails
                  title='DESCRIÇÃO'
                  description={order.observacao}
                  icon={Clipboard}
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
        <Button title="Encerrar solicitação" onPress={handleOrderClose} m={5} />
      )}
    </VStack>
  );
}