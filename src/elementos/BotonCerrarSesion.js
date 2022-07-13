import React from 'react';
import { ReactComponent as IconoCerrarSesion } from './../imagenes/log-out.svg';
import Boton from './Boton';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

const BotonCerrarSesion = () => {
    const navigate = useNavigate();

    const cerrarSesion = async() => {
        try { //esperar a iniciar sesion
            await signOut(auth);
            navigate('/iniciar-sesion');
        } catch (error){

        }
        
    }
    return (  
        <Boton iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrarSesion />
        </Boton>
    );
}
 
export default BotonCerrarSesion;
