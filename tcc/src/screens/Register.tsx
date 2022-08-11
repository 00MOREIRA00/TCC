import { VStack } from 'native-base';
import { Header } from '../componentes/Header';
import { Input } from '../componentes/Input';
import { Button } from '../componentes/Button';

export function Register() {
  return (
    <VStack flex={1} p={6} bg="#cffafe">
        <Header title="Nova Solicitação" />
        
        <Input 
            placeholder="Nome"
            mt={4}
        />

        <Input 
            placeholder="Preção"
            mt={4}
        />

        <Input 
            placeholder="Frequencia"
            mt={4}
        />

        <Input 
            placeholder="Saturação"
            mt={4}
        />

        <Input 
            placeholder="Descrição do Ploblema"
            flex={1}
            mt={5}
            multiline    
        />

        <Button 
            title="Cadastrar"
            mt={5}
        />
    </VStack>
  );
}