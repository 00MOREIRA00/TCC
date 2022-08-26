import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type OrderFirestoreDTO = {
        id: string;
        classificacao: string; 
        nome: string;  
        cpf: string; 
        precao: string; 
        frequencia: string; 
        saturacao: string; 
        observacao: string; 
        status: 'open' | 'closed';
        solution?: string;
        created_at: FirebaseFirestoreTypes.Timestamp;
        closed_at?: FirebaseFirestoreTypes.Timestamp;
}