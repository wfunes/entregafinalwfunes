import './ItemDetail.css'
import ItemCount from '../ItemCount/ItemCount'
import { useState } from 'react'
import { Link } from 'react-router-dom'

//Importamos el CarritoContext: 
import { CarritoContext } from '../../context/CarritoContext'
//Importamos el useContext: 
import { useContext } from 'react';

const ItemDetail = ({ id, nombre, precio, img, stock }) => {

  
  const [agregarCantidad, setAgregarCantidad] = useState(0);
//usando el   useContext: 
  const { agregarProducto } = useContext(CarritoContext);

  //2)Creamos una función manejadora de la cantidad: 
  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    //console.log("Productos Agregados:" + cantidad);

    //Ahora acá creo un objeto con el item y la cantidad:
    const item = { id, nombre, precio };
    agregarProducto(item, cantidad);
  }

  return (
    <div className='contenedorItem'>
      <h2>{nombre} </h2>
      <h3>Precio: {precio} </h3>
      <h3>ID: {id} </h3>
      <h2> la siguiente descripción es generica para todos los productos </h2>
      <p> Título: Puerta de Auto Enchapada de Alta Calidad, Color Plateado, con Terminación y Cierre Extraordinarios

Descripción:
Estás buscando ... perfecta para tu automóvil, una que no solo sea funcional, sino que también agregue estilo y elegancia a tu vehículo. Presentamos nuestra Puerta de Auto Enchapada de los mejores materiales, con un acabado plateado deslumbrante y una calidad excepcional en cada detalle.

Características principales:

Materiales de primera calidad: Nuestra puerta de auto está fabricada con los mejores materiales disponibles en el mercado, lo que garantiza su durabilidad, resistencia y rendimiento excepcional a lo largo del tiempo.

Acabado enchapado: El elegante acabado enchapado en color plateado le da a la puerta un aspecto sofisticado y moderno. El brillo y la suavidad del acabado le otorgan un atractivo visual excepcional, destacándose entre otras puertas de autos convencionales.

Terminación impecable: Cada aspecto de esta puerta ha sido cuidadosamente diseñado y fabricado para lograr una terminación impecable. Los bordes suaves y sin imperfecciones, combinados con una atención meticulosa a los detalles, demuestran la calidad artesanal de nuestro producto.

Cierre extraordinario: Nuestra puerta de auto cuenta con un mecanismo de cierre extraordinario que asegura un ajuste preciso y seguro. El sistema de cierre garantiza que la puerta se cierre suavemente y se mantenga firme en su lugar, brindando tranquilidad y evitando filtraciones o ruidos no deseados.</p>
      <img src={img} alt={nombre} />
      {
        //Acá empleamos la lógica de montaje y desmontaje de componentes: 
      }
      {
        agregarCantidad > 0 ? (<Link to="/cart"> Terminar Compra </Link>) : (<ItemCount inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />)
      }
    </div>
  )
}

export default ItemDetail