import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Header, Titulo,  ContenedorHeader} from './../elementos/Header';
import Boton from './../elementos/Boton';
import {ContenedorBoton, Formulario, Input} from './../elementos/ElementosDeFormulario';
import { ReactComponent as svgLogin } from './../imagenes/login.svg';   
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './../firebase/firebaseConfig';
import Alerta from '../elementos/Alerta';


const Svg = styled(svgLogin)`
    width: 100%;
    max-height: 12.25rem;
    margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
    const[estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});
    const navigate = useNavigate();
    const [correo, establecerCorreo] = useState('');
    const [password, establecerPassword] = useState('');

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            establecerCorreo(e.target.value);
        } else if (e.target.name === 'password'){
            establecerPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        cambiarEstadoAlerta(false);
        cambiarAlerta({});
        
        //Comprobar correo de lado del cliente
        const expresionRegular =  /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if( !expresionRegular.test(correo) ) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje: 'Por favor ingresa un correo valido'
            });
            return;
        }
        if(correo === '' || password === ''){
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo:'error',
                mensaje: 'Rellena todos los datos'
            });
            return;
        }

            try {
                await signInWithEmailAndPassword(auth, correo, password);
                navigate('/');
            } catch(error){
                cambiarEstadoAlerta(true);

                let mensaje;
                switch(error.code){     
                    case 'auth/wrong-password':
                        mensaje = 'La contraseña no es correcta.'
                        break;
                    case 'auth/user-not-found':
                        mensaje = 'No se encontro ninguna cuenta con este correo.'
                    break;
                    default:
                        mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
                }
                cambiarAlerta({tipo:'error', mensaje: mensaje});
            }
            
            
    }
    
    return (  
        <>
        <Helmet>
            <title> Inicio de sesion</title>
        </Helmet>
        
        <Header>
            <ContenedorHeader>
                <Titulo></Titulo>
                <div>
                    <Boton to="/crear-cuenta"> Registrarse</Boton>
                </div>
            </ContenedorHeader>
        </Header>

        <Formulario onSubmit={handleSubmit}>
        <Svg />
            <Input
                type="email"
                name="email"
                placeholder="Correo Electronico"   
                value={correo}    
                onChange={handleChange} 

                />

            <Input
                type="password"
                name="password"
                placeholder="Clave"     
                value={password}
                onChange={handleChange}
                />


            <ContenedorBoton>
                 <Boton as="button" primario>Iniciar sesion</Boton>
            </ContenedorBoton>            
        </Formulario>
        <Alerta
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            estadoAlerta={estadoAlerta}
            cambiarEstadoAlerta={cambiarEstadoAlerta}
        />
    </>
    );
}
 
export default InicioSesion;