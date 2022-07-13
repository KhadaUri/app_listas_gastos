import React from 'react';
import { useAuth } from '../contextos/AuthContext';
import {Navigate} from 'react-router-dom';

const RutaPrivada = ({children}) => {
    const {usuario} = useAuth();

    if(usuario){
        return children;
    } else {
        return <Navigate to='/iniciar-sesion' />
    }
}
 
export default RutaPrivada;