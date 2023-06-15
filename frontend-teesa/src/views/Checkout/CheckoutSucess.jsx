import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import waves from '../../assets/icon/waveschecklow.svg';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const CheckoutSucess = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/home');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${waves})`,
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
      }}
      className='allContainer flex flex-col justify-center items-center w-full h-screen bg-bottom bg-cover  border-t-8 border-teesaGreen -mt-[4px]'
    >
      <div className='flex flex-col justify-center items-center w-3/4  md:w-3/5 lg:w-1/4  lg:h-1/2 bg-white shadow-md rounded-md p-4'>
        <h2 className='text-4xl text-center font-bold mb-4'>
          ¡Felicitaciones!
        </h2>
        <h2 className='text-2xl text-center font-mediumn mb-4'>
          Tu compra ha sido procesada con éxito.
        </h2>
        <div className='transition duration-100 transform hover:scale-105 mt-2 mb-4'>
          <CheckCircleIcon
            sx={{ color: 'green', fontSize: 64 }}
            style={{ transition: 'transform 0.2s ease-in-out' }}
            className='hover:scale-110'
          />
        </div>

        <Button
          onClick={handleNavigateToHome}
          variant='contained'
          color='success'
        >
          Volver al Inicio
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSucess;
