import { VStack, Text } from 'native-base';
import { useRoute} from '@react-navigation/native';
import { Header } from '../componentes/Header';

type RouteParams = {
  orderId: string;
}

export function Details() {

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  return (
    <VStack flex={1} bg="#cffafe">
        
        <Header title="solicitação"/>

        <Text color="black">
              {orderId}
        </Text>

    </VStack>
  );
}