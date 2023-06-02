//Instalaciones:
// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Card } from '../Card/Card';

function Home() {
  // Codigo del Sol:

  // Codigo de Juan:
  //Conexión con Back:
  // eslint-disable-next-line no-unused-vars
  // const [products, setProducts] = useState([]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'https://servidor-teesa.onrender.com/products'
  //     );
  //     setProducts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className='flex w-full h-full flex-col flex-wrap'>
      {/* Second Navbar */}
      <div className='flex bg-teesaBlueDark w-full m-0 items-center justify-center mt-[-1px] border-t-4 border-teesaGreen text-teesaWhite h-[60px] text-[16px]'>
        <h2 className='mx-4  hover:text-teesaGreen'>
          <a href='#'>Electrico</a>
        </h2>
        <h2 className='mx-4  hover:text-teesaGreen'>
          <a href='#'>Gas</a>
        </h2>
        <h2 className='mx-4  hover:text-teesaGreen'>
          <a href='#'>Refrigeración</a>
        </h2>
        <h2 className='mx-4  hover:text-teesaGreen'>
          <a href='#'>Hornos</a>
        </h2>
        <h2 className='mx-4  hover:text-teesaGreen'>
          <a href='#'>Repuestos</a>
        </h2>
      </div>
      {/* Hero */}
      <div className='heroContainer flex w-full h-[800px]'>
        {/* Inicia parte de Sol. */}
        <div className='filters w-1/6 m-4 bg-slate-300 '>
          <h1>Filters</h1>
        </div>
        {/* Termina parte de Sol. */}
        {/* Inicia parte de Juan. */}
        <div className='cardsContainer w-5/6 m-5 bg-teesaGrey flex flex-wrap justify-start items-start'>
          <Card /> <Card /> <Card /> <Card /> <Card />
        </div>
        {/* Termina parte de Juan. */}
      </div>
    </div>
  );
}

export default Home;
