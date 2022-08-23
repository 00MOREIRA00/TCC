import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HStack, IconButton, VStack, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { SignOut } from 'phosphor-react-native';
import { ChatTeardropText } from 'phosphor-react-native';
import Logo from '../assents/Screening.svg';
import { Filter } from '../componentes/Filter';
import { Button } from '../componentes/Button';
import { Order, OrderProps } from '../componentes/Order'
import { color } from 'native-base/lib/typescript/theme/styled-system';

export function Home() {
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const { colors} = useTheme();
    const [orders, setOrders] = useState<OrderProps[]>([
        {
            id: '456',
            nome: 'Clotilde Terra',
            when: '18/08/2022 as 03:48',
            status: 'open'
        }
    ]);
    
    const navigation = useNavigation();
    function handleNewOrder(){
        navigation.navigate('new')
    }

    function handleOpenDetails(orderId: string){
        navigation.navigate('details', { orderId })
    }

    function handleLogout(){
        auth().signOut().catch(error => {
            console.log(error);
            return Alert.alert('Sair', 'Não foi possivel sair');

        })
    }

  return (
    <VStack flex={1} pb={1} bg="#cffafe">
        <HStack w="full" justifyContent="space-between" alignItems="center" bg="#FFFAF0" pt={1} pb={1} px={2}>
            <Logo />

            <IconButton 
                icon={ <SignOut size={26} color={colors.black}/> } onPress={handleLogout}
            />
        </HStack>

        <VStack flex={1} px={6}>
            <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
                <Heading fontSize={16}>
                    Meus Chamados
                </Heading>
                <Text color="black">
                    3
                </Text>
            </HStack>

            <HStack space={3} mb={8}>
                < Filter 
                    type="open" 
                    title="em andamento"
                    onPress={() => setStatusSelected('open')}
                    isActive={statusSelected === 'open'}
                    />

                < Filter 
                    type="closed" 
                    title="finalizado"
                    onPress={() => setStatusSelected('closed')}
                    isActive={statusSelected === 'closed'}
                    />

            </HStack>
            
            <FlatList 
                data={orders}
                keyExtractor={ item => item.id}
                renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)}/>}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:50}}
                ListEmptyComponent={() => (
                    <Center>
                        <ChatTeardropText color={colors.gray[700]} size={40}/>
                        <Text color="gray.700" fontSize="xl" mt={6} textAlign="center">
                            Você ainda não possui {'\n'}
                            solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                        </Text>
                    </Center>
                )}
            />

            <Button title="Nova Solicitação" mb={5} onPress={handleNewOrder} />
        </VStack>

        

    </VStack>
  );
}