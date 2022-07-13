import {useEffect, useState} from 'react';
import {db} from './../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';


const useObtenerGasto = (id) => {
    const [gasto, establecerGasto] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        const ObtenerGasto = async() => {
            
             //Conexion a gastos y obtener el id del doc
            const documento = await getDoc(doc(db, 'gastos', id)); 

            if(documento.exists){
                establecerGasto(documento);
            } else {
                navigate("/lista");
            }
        }
        ObtenerGasto();  
        }, [navigate, id]);

    return [gasto];
}
 
export default useObtenerGasto;
