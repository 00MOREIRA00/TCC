import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { VStack, Heading, Icon } from 'native-base';
import { Envelope, Key} from 'phosphor-react-native';
import Logo from '../assents/logotipo.svg';
import { Input } from '../componentes/Input';
import { Button } from '../componentes/Button';


export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail ] =  useState('');
    const [password, setPassword ] =  useState('');

    function handleAssign(){
        //Configurando a Autenticação
        if(!email || !password) {
            return Alert.alert('Entrar', 'Informe e-mail e senha');
        }

        setIsLoading(true);

        auth().signInWithEmailAndPassword(email, password).then(response =>{
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);

            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Entrar', 'Email ou senha inválido');
            }

            if(error.code === 'auth/wrong-password'){
                return Alert.alert('Entrar', 'Email ou senha inválido');
            }

            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar', 'Usuário não cadastrado');
            }

            return Alert.alert('Entrar', 'Não foi possivel acessar');
 
        });

        
    }
    return (

        <VStack flex={1} alignItems="center" bg="#cffafe" px={8} pt={24}>
            <Logo />

           <Heading color="#000000" fontSize="xl" mt={20} mb={6}>
            Acesse sua conta
           </Heading>

           <Input placeholder="E-mail" mb={4} InputLeftElement={<Icon as ={ <Envelope color="black" /> } ml={4} />} onChangeText={setEmail}/>
           <Input placeholder="Senha" mb={4}  InputLeftElement={<Icon as ={ <Key color="black"/> } ml={4} />} secureTextEntry onChangeText={setPassword}/>

            <Button title="Entrar"  w="full" onPress={handleAssign} isLoading={isLoading}/>
        </VStack>
    )
}