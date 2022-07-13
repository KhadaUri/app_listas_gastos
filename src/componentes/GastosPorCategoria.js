import React from 'react';
import {Header, Titulo } from './../elementos/Header';
import Helmet from 'react-helmet';
import BtnRegresar from '../elementos/BntRegresar';
import BarraTotalGastado from './BarraTotalGastado';
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria';
import {ListaDeCategorias, ElementoListaCategorias, Categoria, Valor} from './../elementos/ElementosDeLista';
import IconoCategoria from './../elementos/IconoCategoria';
import FormatearCantidad from '../funciones/convertirAMoneda';

const GastorPorCategoria = () => {    
  const gastosPorCategoria = useObtenerGastosDelMesPorCategoria();
    return (  
        <>
        <Helmet>
          <title>
            Gastos Por categoria
          </title>
        </Helmet>
  
        <Header>
            <BtnRegresar></BtnRegresar>
            <Titulo>Gastos Por categoria</Titulo>
        </Header>

        <ListaDeCategorias>
            {gastosPorCategoria.map((elemento, index)=>{
                return(
                  <ElementoListaCategorias key={index}>                      
                      <Categoria> 
                        <IconoCategoria id={elemento.categoria}/> 
                        {elemento.categoria}
                      </Categoria>
                      <Valor>{FormatearCantidad(elemento.cantidad)}</Valor>
                  </ElementoListaCategorias>
                );
            })}
        </ListaDeCategorias>
        
        <BarraTotalGastado />
      </>
    );
}
 
export default GastorPorCategoria;