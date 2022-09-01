import { Heading, HStack, IconButton, StyledProps, useTheme } from 'native-base';
import {CaretLeft, Trash} from 'phosphor-react-native';
import { StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native'

type Props = StyledProps & {
    title: string;
    isTrashButton: boolean;
    trashButtom(): void;
}

export function Header({ title, isTrashButton, trashButtom, ...rest }: Props) {
    const { colors } = useTheme();
    const navigation = useNavigation();


    function handleGoBavk(){
        navigation.goBack();
    }

  return (
    <HStack 
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="#cffafe"
        pb={6}
        pt={12}
        {...rest}
    >
        <IconButton 
            icon={<CaretLeft color={colors.gray[700]} size={24}/>} onPress={handleGoBavk}
        />
        
        <Heading color="gray.700" textAlign="center" fontSize="lg" flex={1} ml={-6}>
            {title}
        </Heading>

        {isTrashButton &&
        <IconButton 
            icon={<Trash  color={colors.gray[700]} size={24}/>} onPress={trashButtom}
        />
        }
    </HStack>
  );
}