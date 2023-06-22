import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUser, getCart } from '../../features/reduxReducer/carritoSlice';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import 'boxicons/css/boxicons.min.css';
import title from '../../title.png';
import {
  resetUserState,
  updateUserDataFromCookie,
} from '../../features/reduxReducer/userSlice';
import { getCartGuestProducts } from '../../features/reduxReducer/cartGuestSlice';
// import { addToCartWithQuantity } from '../../features/reduxReducer/carritoSlice';
// import Cookies from 'universal-cookie';
// import CartIcon from '../Carrito/CartIcon';

export default function NavBar(props) {
  //Traer Data del User - Nuestro Login y Register
  const userData = useSelector((state) => state.userState);
  const dispatch = useDispatch();
  const {
    user,
    userData: { userName },
    userData: { userId },
  } = userData;

  const userAdmin = useSelector((state) => state.userState.userData.userType);

  const [cartId, setCartId] = useState('');

  const [cart, setCart] = useState({
    CartId: cartId,
  });
  const [info, setInfo] = useState({
    items: '',
  });
  const userUUID = props.userId;
  useEffect(() => {
    dispatch(getUser()).then((action) => {
      const response = action.payload;
      // console.log(response);
      const cartId = response.find((user) => user.id === userId)?.Cart.id;
      // console.log(cartId);
      if (cartId) {
        dispatch(getCart(cartId)).then((action) => {
          const response = action.payload;
          // console.log(response);
          setInfo((prevInfo) => ({
            ...prevInfo,
            items: response,
          }));
        });
      } else
        dispatch(getCartGuestProducts(userUUID)).then((action) => {
          const response = action.payload;
          setInfo((prevInfo) => ({
            ...prevInfo,
            items: response,
          }));
        });
    });
  }, [dispatch, userData, info]);

  //Google
  const [nombreGoogle, setNombreGoogle] = useState(null);
  const cookies = new Cookies();
  //Sesión Continúa: Data del User - Google Auth

  useEffect(() => {
    const nombreGoogleCookie = cookies.get('nombreGoogle');
    // const idGoogleCookie = cookies.get('idGoogle');
    // const emailGoogleCookie = cookies.get('correoGoogle');

    if (nombreGoogleCookie) {
      dispatch(updateUserDataFromCookie());
      setNombreGoogle(nombreGoogleCookie);
    }

    //Parte Original:
    // if (nombreGoogleCookie && !user) {
    //   dispatch(saveUserDataToCookie({ nombre: nombreGoogleCookie }));
    //   setNombreGoogle(nombreGoogleCookie);
    // }
  }, []);

  //Log Out Button

  const handleLogout = () => {
    // Vaciar estados de Login, Register y vaciar data del User.
    const cookies = new Cookies();
    cookies.remove('token', { path: '/' });
    cookies.remove('idGoogle', { path: '/' });
    cookies.remove('nombreGoogle', { path: '/' });
    cookies.remove('correoGoogle', { path: '/' });
    cookies.remove('OursUserEmail', { path: '/' });
    resetUserState();
    navigate('/home', { replace: true });
    window.location.reload();
  };

  //Mostrar Botón
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipToggle = () => {
    setShowTooltip(!showTooltip);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  //carrito
  // const cartt = useSelector((state) => state.app.cart);

  //carrito
  // const cartt = useSelector((state) => state.app.cart);

  const cartItems = useSelector((state) => state.app.items);

  // console.log("Cart Length:", cartt.length);

  return (
    <div className='flex flex-row justify-between items-center w-full h-[4em] border-b-2 border-gray-300 bg-teesaBlueDark text-white text-xl sm:text-lg relative'>
      <div className='flex items-center'>
        <img
          className='w-[10%] my-0'
          src={title}
          alt='Icono Teesa'
        />
        <div className='hidden sm:flex gap-[4%]'>
          <NavLink
            to='/home'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Inicio
          </NavLink>
          <NavLink
            to='/services'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Servicios
          </NavLink>
          <NavLink
            to='/contact'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Contáctanos
          </NavLink>
          <NavLink
            to='/about'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Nosotros
          </NavLink>
          <NavLink
            to='/aboutdevs'
            className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
          >
            Devs
          </NavLink>
          {userAdmin == true ? (
            <NavLink
              to='/admin'
              className='transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen'
            >
              Dashboard
            </NavLink>
          ) : (
            <div></div>
          )}
        </div>
        <div className='sm:hidden'>
          <i
            className={`bx ${
              isMobileMenuOpen ? 'bx-x' : 'bx-menu'
            } text-3xl text-white ml-4 cursor-pointer`}
            onClick={handleMobileMenuToggle}
          ></i>
        </div>
      </div>

      <div className='flex items-end justify-end xl:mr-[4%] lg:mr-[4%] md:mr-[3%] sm:mr-[3%]'>
        {user || nombreGoogle ? (
          <div
            className={`mr-5 cursor-pointer relative flex items-center ${
              isMobileMenuOpen ? 'hidden sm:flex' : 'flex'
            }`}
            onMouseEnter={handleTooltipToggle}
            onMouseLeave={handleTooltipToggle}
          >
            <span className='hover:text-teesaGreen transition duration-300 ease-in-out'>
              {nombreGoogle ? nombreGoogle : userName}
            </span>
            <i
              className='fa-solid fa-user ml-5 flex transition duration-300 ease-in-out transform hover:text-teesaGreen'
              style={{ fontSize: '1.4rem' }}
            ></i>

            {showTooltip && (
              <div className='absolute flex-col h-auto bg-black top-full'>
                <div className=' right-0 w-40 bg-gray-100 text-gray-700 py-1 px-2 rounded-sm text-center hover:text-gray-900 hover:font-medium text-sm'>
                  <NavLink to='/profile'>
                    <p>Mi Perfil</p>
                  </NavLink>
                </div>

                <div
                  onClick={handleLogout}
                  className=' right-0 w-40 bg-gray-100 text-gray-700 py-1 px-2 rounded-sm text-center hover:text-gray-900 hover:font-medium text-sm'
                >
                  Cerrar sesión
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to='/login'
            className={`mr-5 transition duration-300 ease-in-out transform hover:text-teesaGreen focus:text-teesaGreen ${
              isMobileMenuOpen ? 'hidden sm:flex' : 'flex'
            }`}
          >
            Ingresar
          </NavLink>
        )}
        {!user && (
          <NavLink
            to='/login'
            className={`flex transition duration-300 ease-in-out transform hover:text-teesaGreen ${
              isMobileMenuOpen ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <i
              className='fa-solid fa-user mr-6'
              style={{ fontSize: '1.6rem' }}
            ></i>
          </NavLink>
        )}
        {/* <i
          className={`bx bx-cart mr-6 ${
            isMobileMenuOpen ? 'hidden sm:flex' : 'flex'
          }`}
          style={{ fontSize: '1.5rem' }}
        ></i> */}

        {userAdmin == true ? (
          <div></div>
        ) : (
          <div>
            <div className='relative'>
              <NavLink
                to='/carrito'
                className='flex items-center'
              >
                <i className='fa-solid fa-cart-shopping text-xl rounded-md hover:text-teesaGreen'></i>
                {info.items?.cartProducts?.length > 0 ? (
                  <span className='absolute -top-1 -right-3 bg-teesaGreen text-white rounded-full text-xs px-1.5 py-.05'>
                    {info.items.cartProducts.reduce(
                      (total, item) => total + item.cantidad,
                      0
                    )}
                  </span>
                ) : info.items?.cartGuestProducts?.length > 0 ? (
                  <span className='absolute -top-1 -right-3 bg-teesaGreen text-white rounded-full text-xs px-1.5 py-.05'>
                    {info.items.cartGuestProducts.reduce(
                      (total, item) => total + item.cantidad,
                      0
                    )}
                  </span>
                ) : null}
              </NavLink>
            </div>
          </div>
        )}

        {/* Boton carrito Navv*/}
      </div>

      {isMobileMenuOpen && (
        <div className='sm:hidden w-full absolute top-full left-0 bg-teesaBlueDark text-white py-2 z-10'>
          <NavLink
            to='/home'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-base block'
          >
            Inicio
          </NavLink>
          <NavLink
            to='/services'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-base block'
          >
            Servicios
          </NavLink>
          <NavLink
            to='/contact'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-base block'
          >
            Contáctanos
          </NavLink>
          <NavLink
            to='/about'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-base block'
          >
            Nosotros
          </NavLink>
          <NavLink
            to='/aboutdevs'
            className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-base block'
          >
            Devs
          </NavLink>
          {userAdmin == true ? (
            <NavLink
              to='/admin'
              className='w-full px-4 py-2 hover:bg-teesaGreen hover:text-teesaBlueDark text-base block'
            >
              Dashboard
            </NavLink>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
}
