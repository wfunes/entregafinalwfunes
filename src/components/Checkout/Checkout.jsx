import { useState, useContext } from "react";
import {CarritoContext} from '../../context/CarritoContext';
import {db} from '../../services/config';
import {collection, addDoc, updateDoc, doc, getDoc} from 'firebase/firestore';
import './Checkout.css'


const Checkout = () => {
    const {carrito, vaciarCarrito, total} = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");
    
    //funciones y validaciones: 

    const manejadorFormulario = (event) => {
        event.preventDefault();

        //Verificamos que los campos esten completos:
        if(!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Verificar los Cuadro de Texto, para continuar ..."); 
            return;
        }

        //Validamos que los campos del email coincidan 
        if(email !== emailConfirmacion) {
            setError("Verifique las contraseñas (no son iguales)");
            return;
        }

        //Paso 1: Creamos el objeto de la orden: 

        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: carrito.reduce((total, producto)=> total + producto.item.precio * producto.cantidad, 0),
            nombre,
            apellido, 
            telefono,
            email,
            fecha: new Date(),
        };

        //Vamos a modificar el código para que ejecute varias promesas en paralelo, por un lado que actualice el stock de productos y por otro que genere una orden de compras. Promise.All me permite esto: 

        Promise.all(
            orden.items.map(async (productoOrden) => {
                //Por cada producto en la colección inventario obtengo una referencia, y a partir de esa referencia obtengo el doc. 
                const productoRef = doc(db, "inventario", productoOrden.id);
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                //Data es un método qu eme permite acceder a la información del Documento. 
                await updateDoc(productoRef, {
                    stock: stockActual - productoOrden.cantidad,
                });
                //Modifico el stock y subo la información actualizada. 
            })
        )
            .then(() => {
                //Guardan la orden de compra en la base de datos: 
                addDoc(collection(db, "ordenes"), orden)
                    .then((docRef) => {
                        setOrdenId(docRef.id);
                        vaciarCarrito();
                    })
                    .catch((error) => {
                        console.error("Error al crear la orden", error);
                        setError("Se produjo un error al crear la orden");
                    })
            })
            .catch((error) => {
                console.error("Error al actualizar el stock", error);
                setError("Se produjo un error al actualizar el stock de los productos, vuelva más tarde");
            })
    }

    return(


    <div>
        <h2>Checkout</h2>
        <form onSubmit={ manejadorFormulario } className="formulario">
            {carrito.map(producto => (
                <div key={producto.item.id}>
                    <p>
                        {producto.item.nombre} x {producto.cantidad}
                    </p>
                    <p> Precio $: {producto.item.precio} </p>
                    <hr />
                </div>
            ))}
            <p>Total Compra: {total} </p>
            <hr />

                <div className="form-group">
                    <label htmlFor=""> Nombre </label>
                    <input type="text" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                </div>
                
                <div className="form-group">
                    <label htmlFor=""> Apellido </label>
                    <input type="text" value={apellido} onChange={(e)=>setApellido(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor=""> Telefono </label>
                    <input type="text" value={telefono} onChange={(e)=>setTelefono(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email </label>
                    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor=""> Email Confirmación </label>
                    <input type="email" value={emailConfirmacion} onChange={(e)=> setEmailConfirmacion(e.target.value)} />
                </div>

                {error && <p style={{color:"red"}}> {error} </p>}
                <button type="submit"> Finalizar Compra </button>
        </form>
        {
            ordenId && (
                <strong>¡Gracias por tu compra! Tu número de Orden es {ordenId} </strong>
            )
        }
    </div>
  )
}

export default Checkout
