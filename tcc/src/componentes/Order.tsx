import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type OrderProps = {
    id: string;
    classificacao: string; 
    nome: string;  
    cpf: string; 
    precao: string; 
    frequencia: string; 
    saturacao: string; 
    observacao: string; 
    when: string;
    status: 'open' | 'closed';
};

type Props = IPressableProps & {
    data: OrderProps;
}

export function Order({ data, ...rest }: Props) {
    const { colors } = useTheme();
    const statusColor = data.status === 'open' ? colors.gray[200] : colors.gray[100];

  return (
    <Pressable {...rest}>
    <HStack 
        bg="#FFFAF0"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
    >
        <Box h="full" w={2} bg={statusColor}/>
        <VStack flex={1} my={5} ml={5}>
            <Text color="black" fontSize="md">
                Classificacao: {data.classificacao}
            </Text>

            <HStack alignItems="center">
                <ClockAfternoon size={15} color={colors.gray[700]}/>
                <Text color="gray.700" fontSize="xs" ml={1}>
                    {data.when}
                </Text>
            </HStack>
        </VStack>

        <Circle bg="gray.700" h={12} w={12} mr={5}>
            {
                data.status === 'open' 
                ? <CircleWavyCheck size={24} color={statusColor} />
                : <Hourglass size={24} color={statusColor} />
            }
        </Circle>
    </HStack>
    </Pressable>
  );
}