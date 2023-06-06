import React from 'react';
import AboutDevCard from '../About/AboutDevCard/AboutDevCard';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo - Screenshot.jpg';
// import FaLinkedin from "../../assets/LinkedIn_icon.svg.png"
// import FaGithub from "../../assets/images.png"
import developers from "../../developersData";

const About = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-white text-black">
      <div className="xl:w-4xl lg:max-w-3xl md:max-w-2xl sm:max-w-md">
        <h1 className="xl:text-4xl lg:text-xl md:text-xl sm:text-xl font-bold mt-8 mb-4 text-teesaBlueDark md:text-left">Desarrolladores Web</h1>
        <p className="xl:text-xl lg:text-md md:text-lg sm:text-md mb-[5%] text-blue-900 md:text-left">
          Somos un equipo de 7 web developers provenientes de Colombia y Argentina unidos para desarrollar este proyecto, combinando nuestros conocimientos en bases de datos, back-end y front-end, y aplicando herramientas de diseño UX/UI para ofrecer una experiencia de navegación intuitiva.
        </p>
        <hr className="border-t border-teesaGreen my-8" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2 md:col-span-4">
          <div className="flex justify-center">
            {developers.slice(0, 4).map((developer) => (
              <AboutDevCard
                key={developer.name}
                name={developer.name}
                country={developer.country}
                role={developer.role}
                linkedin={developer.linkedin}
                github={developer.github}
                image={developer.img ? developer.img : developer.image}
              />
            ))}
          </div>
        </div>

  <div className=" md:col-span-4 flex justify-center">
          {developers.slice(4, 7).map((developer) => (
            <AboutDevCard
              key={developer.name}
              name={developer.name}
              country={developer.country}
              role={developer.role}
              linkedin={developer.linkedin}
              github={developer.github}
              image={developer.img ? developer.img : developer.image}
            />
          ))}
      </div>
    </div>
    <footer className="w-full flex items-center justify-between bg-teesaBlueDark py-4 px-4">
        <p className="text-center mt-4 text-teesaWhite flex-grow">
          Si deseas obtener más información sobre nuestro personal y su formación profesional, ¡háznoslo saber!
        </p>
        <div className="flex items-center">
          <img src={Logo} alt="" className="w-6 h-6 mx-2" />
        <Link to="/contact">
          <button className="text-white text-sm rounded-md px-4 py-2 ml-2 font-semibold bg-teesaGreen hover:bg-gradient-to-r from-teesaGreen to-teesaGreenDark transition-colors duration-300 shadow-md">
            Contacto
          </button>
        </Link>
      </div>
      </footer> 
    </div>
  );
};

export default About;

