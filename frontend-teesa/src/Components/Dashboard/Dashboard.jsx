/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  getUser,
  getShopId,
  enableUser,
  enableUserfalse,
} from '../../features/reduxReducer/adminSlice';
import { getProductsChart } from '../../features/reduxReducer/admproductSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import SalesChart from './SalesChart';
import MonthSalesChart from './MonthSalesChart';


function UserCard({ usuario }) {
  const dispatch = useDispatch();
  const [isUsuarioHabilitado, setIsUsuarioHabilitado] = useState(
    usuario.enable
  );
  const [historialCompras, setHistorialCompras] = useState([]);

  const [mostrarHistorial, setMostrarHistorial] = useState(false); // Estado para controlar la visibilidad del historial
 
 



  useEffect(() => {
    const fetchHistorialCompras = async () => {
      const shopId = await dispatch(getShopId(usuario.id));
      setHistorialCompras(shopId.payload);
    };

    if (mostrarHistorial) {
      fetchHistorialCompras();
    } else {
      setHistorialCompras([]); // Limpiar el historial de compras cuando se oculta
    }
  }, [dispatch, usuario.id, mostrarHistorial]);
  const handleMostrarHistorial = () => {
    setMostrarHistorial(!mostrarHistorial);
  };

  const handleHabilitarUsuario = () => {
    const enableValue = !isUsuarioHabilitado;
    setIsUsuarioHabilitado(enableValue);
    dispatch(enableUser(usuario.id));
  };

  const handleDesactivarUsuario = () => {
    const enableValue = false;
    setIsUsuarioHabilitado(enableValue);
    dispatch(enableUserfalse(usuario.id));
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 mb-4 ${
        isUsuarioHabilitado ? '' : 'opacity-50'
      }`}
    >
      <h3 className='text-lg font-semibold'>{usuario.nombre}</h3>
      <p className='text-sm'>
        <strong>Dirección:</strong> {usuario.direccion}
      </p>
      <p className='text-sm'>
        <strong>Teléfono:</strong> {usuario.telefono}
      </p>
      <p className='text-sm'>
        <strong>Correo:</strong> {usuario.correo}
      </p>

      <button
        onClick={
          isUsuarioHabilitado ? handleDesactivarUsuario : handleHabilitarUsuario
        }
        className={`rounded-md text-white p-2 mt-2 ${
          isUsuarioHabilitado
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
        }`}
        style={{ marginRight: '10px' }}
      >
        {isUsuarioHabilitado ? 'Inhabilitar Usuario' : 'Habilitar Usuario'}
      </button>

      <button
        onClick={handleMostrarHistorial}
        className='bg-blue-600 rounded-md text-white hover:bg-blue-700 p-2 mt-2'
        style={{ marginLeft: '10px' }}
      >
        {mostrarHistorial
          ? 'Ocultar historial de compras'
          : 'Ver historial de compras'}
      </button>

      {mostrarHistorial && (
        <>
          {historialCompras.length ? (
            <ul className='mt-4'>
              {historialCompras.map((compra) => (
                <li
                  key={compra.id}
                  className='mb-2'
                >
                  <div className='flex items-center'>
                    <img
                      src={compra.Product.imagenes[0]}
                      alt='Producto'
                      className='w-8 h-8 mr-2'
                    />
                    <div>
                      <p className='text-sm font-semibold'>
                        {compra.Product.nombre}
                      </p>
                      <p className='text-xs text-gray-500'>
                        Fecha: {compra.fechaDeCompra}
                      </p>
                    </div>
                  </div>
                  <div className='text-xs'>
                    Precio: {compra.precio}, Cantidad: {compra.cantidad},
                    Estado: {compra.estado}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h1>Este usuario no realizo ninguna compra</h1>
          )}
        </>
      )}
    </div>
  );
}

function Dashboard() {
  //*Validar Admin - Juan:

  const navigate = useNavigate();
  const alertGoodbye = () => {
    Swal.fire({
      title: '¡Un momento!',
      text: 'No eres admin, no puedes estar aquí.',
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#192C8C',
    }).then(() => {
      navigate('/home');
    });
  };

  const userAdmin = useSelector((state) => state.userState.userData.userType);
  // console.log('data' + userAdmin);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    if (userAdmin === null) {
      const timeout = setTimeout(() => {
        if (waiting) {
          alertGoodbye();
        }
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setWaiting(false);
    }
  }, [userAdmin, waiting]);

  useEffect(() => {
    if (userAdmin !== null && !waiting) {
      // Validar los datos después de que se hayan obtenido
      if (userAdmin === false) {
        alertGoodbye();
      }
    }
  }, [userAdmin, waiting]);

  //Tiago:

  const users = useSelector((state) => state.admin.users); // Obtener la lista de usuarios del estado
  const dispatch = useDispatch();
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getProductsChart())
    }, [dispatch]) 

    const ProductChart=useSelector((state)=>state.adminProductState.ProductChart)

    console.log(ProductChart)
  const handleMostrarUsuarios = () => {
    setMostrarUsuarios(!mostrarUsuarios);
  };

  return (
    <div className='flex flex-col items-center min-h-screen bg-gradient-to-r from-teesaGreen to-teesaBlueDark'>
      <h1 className='text-3xl text-white font-bold mt-[1%] mb-[1%]'>Bienvenido al Dashboard!</h1>
      {/* charts */}
      <section className='flex flex-row gap-[3em] items-center justify-center'>
        <article className='flex flex-col items-center font-bold text-lg text-teesaGrey'>
          <div>{ProductChart && <SalesChart salesData={ProductChart.productSales} />}</div>
          Producto mas vendido:
          {ProductChart && <h1>{ProductChart.mostSoldProduct}</h1>}
          {ProductChart && <h2>{ProductChart.mostSoldCount}</h2>}
           </article>
        <article className=' bg-white'>
        <div>{ProductChart && <MonthSalesChart salesByMonth={ProductChart.salesByMonth} />}</div>
        </article>
      </section>
      <h2 className='font-bold text-2xl text-white'>Quieres</h2>
      <div className='flex flex-row justify-center items-center mt-4 gap-[6%]'>
        <NavLink to='/admin/createproduct'>
          <button className='bg-teesaBlueLight rounded-xl text-white flex flex-row hover:bg-teesaBlueDark p-2'>
            Crear producto nuevo
          </button>
        </NavLink>
        <h3 className='font-bold text-2xl text-white'>o</h3>
        <button
          onClick={handleMostrarUsuarios}
          className='bg-teesaBlueLight rounded-xl text-white flex flex-row hover:bg-teesaBlueDark p-2'
        >
          {mostrarUsuarios ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}
        </button>
      </div>

      {mostrarUsuarios && (
        <div className='grid grid-cols-2 gap-4 mt-4 mx-4'>
          {users?.map((usuario) => (
            <div
              key={usuario.id}
              className='p-4 bg-white rounded-lg shadow'
            >
              <UserCard usuario={usuario} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
