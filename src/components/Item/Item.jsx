import './Item.css'
import { Link } from 'react-router-dom'
//gestionando el Item para ser mostrado Junio 2023

const Item = ({id, nombre, precio, img}) => {
  return (
    <div className='cardProducto'>
        <img className='imgProducto' src={img} alt={nombre} />
        <h3> {nombre} </h3>
        <p>Precio: {precio} </p>
        <p>ID: {id} </p>
        <Link className="linquear" to={`/item/${id}`}> Detalles </Link>
    </div>
  )
}

export default Item

