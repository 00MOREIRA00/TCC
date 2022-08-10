import { useState } from 'react';
import { VStack, Heading, Icon } from 'native-base';
import { Envelope, Key} from 'phosphor-react-native';
import Logo from '../assents/logotipo.svg';
import { Input } from '../componentes/Input';
import { Button } from '../componentes/Button';


export function SignIn(){

    const [name, setName ] =  useState('');
    const [password, setPassword ] =  useState('');

    function handleAssign(){
        console.log(name, password)
    }
    return (

        <VStack flex={1} alignItems="center" bg="#cffafe" px={8} pt={24}>
            <Logo />

           <Heading color="#000000" fontSize="xl" mt={20} mb={6}>
            Acesse sua conta
           </Heading>

           <Input placeholder="E-mail" mb={4} InputLeftElement={<Icon as ={ <Envelope color="black" /> } ml={4} />} onChangeText={setName}/>
           <Input placeholder="Senha" mb={4}  InputLeftElement={<Icon as ={ <Key color="black"/> } ml={4} />} secureTextEntry onChangeText={setPassword}/>

            <Button title="Entrar"  w="full" onPress={handleAssign}/>
        </VStack>
    )
}