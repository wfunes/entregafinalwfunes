import CartWidget from "../CartWidget/CartWidget"
import './NavBar.css'
import { NavLink, Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div class="topnav" id="myTopnav">
    <header>
      <Link to={"/"}>
        <h1>Expo AutoPartes SL!</h1>
      </Link>
      <nav>
        <ul>
          
          <li>
            <NavLink to={`/categoria/2`}> Puertas </NavLink>
          </li>

          <li>
            <NavLink to={`/categoria/3`}> Luces </NavLink>
          </li>
          <li>
            <NavLink to={`/categoria/4`}> Accesorios </NavLink>
          </li>
        </ul>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
        
      </nav>


      <CartWidget />

    </header>
    </div>
  )
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}

export default NavBar