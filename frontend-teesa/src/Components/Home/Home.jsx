/* eslint-disable no-unused-vars */
//Instalaciones:
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//Redux:
import {
  addFilter,
  fetchProducts,
} from '../../features/reduxReducer/filterSlice';
import {
  sortByName,
  sortByPrice,
  getPaginationData,
} from '../../features/reduxReducer/productSlice';
//Gif
import loadingGif from '../../assets/icon/Loading.gif';
//Componentes:
// import CartWindowCart from '../Card/CardWindowCart';
import { SearchBar } from '../SearchBar/SearchBar';
// import { NoHayProductosSearch } from '../../Components/NoHayProductosSearch/'
import { Card } from '../Card/Card';
import FilterComponent from './FilterComponent';
import Pagination from '../Pagination/Pagination';
import {
  getUserDataFromCookie,
  saveUserDataToCookie,
} from '../../features/reduxReducer/userSlice';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Carrito from '../Carrito/Carrito';
import NoHayProductosSearch from '../NoHayProductosSearch/NoHayProductosSearch';

function Home() {
  const [effectExecuted, setEffectExecuted] = useState(false);
  //Sol - Ordenamientos:

  const handleSort = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value)); // Pasa el valor directamente
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleSortPrices = (e) => {
    e.preventDefault();
    dispatch(sortByPrice({ minPrice: 100000000, maxPrice: 500000000 }));
    dispatch(sortByPrice(e.target.value.toLowerCase()));
    setOrden(`Ordenado por precio ${e.target.value}`);
  };

  // Carrito
  const [showFilters, setShowFilters] = useState(false); // Estado para mostrar/ocultar los filtros

  // Tiago y Juan - Estado de Páginación:

  //Tiago y Juan - Paginación.

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const isDataLoaded = useSelector(
    (state) => state.productState.allProducts.length > 0
  );
  // Codigo de Sol:
  const [orden, setOrden] = useState('');
  useEffect(() => {
    dispatch(getPaginationData(currentPage));
  }, [dispatch, currentPage]);

  //*Filtros Nuevos:

  const { filters, products, status, error } = useSelector(
    (state) => state?.filters
  );

  //*Nuestro Login: Comprobar token - Cargar Datos del User (userSlice).
  useEffect(() => {
    const cookies = new Cookies();

    if (cookies.get('token', { path: '/' }) && !effectExecuted) {
      dispatch(getUserDataFromCookie());
      setEffectExecuted(true);
    }
  }, [dispatch, effectExecuted]);

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      dispatch(fetchProducts(filters));
    }
  }, [filters, dispatch]);

  const handleApplyFilters = (selectedFilters) => {
    dispatch(addFilter(selectedFilters));
  };

  //*Google Auth: Sacar Data de Query

  useEffect(() => {
    const url = new URL(window.location.href);
    const nombre = url.searchParams.get('nombre');
    const correo = url.searchParams.get('correo');
    const id = url.searchParams.get('id');
    if (nombre) {
      dispatch(saveUserDataToCookie({ nombre, correo, id }));
    }
  }, [dispatch]);

  return (
    <div className='flex flex-col'>
      {/* Second Navbar */}
      <div className='flex flex-col bg-teesaBlueDark w-full h-[3em] items-center justify-center mt-[-1px] border-t-4 border-teesaGreen text-teesaWhite text-[16px]'>
        <SearchBar />
      </div>
      {/* Hero */}
      <div className='heroContainer flex flex-wrap'>
        {/* Inicia parte de Sol. */} {/* FILTROS */}
        <div className='filters w-full md:w-1/6 m-4 bg-gray-100 p-4 rounded-lg'>
          <h1 className='text-xl font-bold mb-4 text-teesaBlueDark'>
            Filtrar por:
          </h1>
          <FilterComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onApplyFilters={handleApplyFilters}
          />
        </div>
        {/* Termina parte de Sol. */}
        {/* Inicia parte de Juan. */}
        {/* Cards */}
        <div className='cardsContainer w-full md:w-2/3 m-5 bg-teesaWhite flex flex-wrap justify-center'>
          {status === 'loading' && (
            <div className='flex justify-center items-center w-full h-[800px]'>
              <img
                src={loadingGif}
                alt='gif'
              />
            </div>
          )}
          {status === 'failed' && (
            <div>Error al cargar los productos: {error}</div>
          )}
          {status === 'succeeded' && (
            <div className='flex flex-wrap m-auto justify-center'>
              {products.products?.map((product) => (
                <Card
                  id={product?.id}
                  key={product?.id}
                  nombre={product?.nombre}
                  categoria={product?.categoria}
                  precio={product?.precio}
                  imagenes={product?.imagenes}
                  marca={product?.marca}
                />
              ))}
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
