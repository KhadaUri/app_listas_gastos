import React, { useState, useContext, useEffect, useSyncExternalStore } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// creamos contextos
const AuthContext = React.createContext();

// Hook para acceder al contexto
const useAuth =  () => {
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
    const [usuario, cambiarUsuario] = useState();

    // Creamos un state para saber cuando termina de cargar la comprobacion
    const [cargando, cambiarCargando] = useState(true);

    // EFecto para ejecutar la comprobacion de la sesion 1 vez 
    useEffect (() => {
        //Comprobamos si hay un usuario con servicio de Firebase
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSuscripcion;
    }, []);

    return (  
        <AuthContext.Provider value={{usuario: usuario}}>
            { //Retornamos los elementos hijo 

            //Se realiza la comprobacion para mostrar los elementos hijo
            !cargando && children}
        </AuthContext.Provider>
    );
}
 
export {AuthProvider, AuthContext, useAuth};