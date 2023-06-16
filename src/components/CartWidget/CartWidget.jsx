import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';
import './CartWidget.css'

const CartWidget = () => {
  const { cantidadTotal } = useContext(CarritoContext);
  const imgCarrito = "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f6d2.png";

  return (
    <div>
      <Link to='/cart'>
        <img className='imgCarrito' src={imgCarrito} alt="Carrito de Compras" />
        {
          cantidadTotal > 0 && <span> {cantidadTotal} </span>
        }
      </Link>
    </div>
  )
}

export default CartWidget