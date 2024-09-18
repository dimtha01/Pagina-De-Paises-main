import { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "./Card";
import { convertirAMayusculas, obtenerPrimeraPalabra } from "../util/util";
const API = 'https://restcountries.com/v3.1/all';

const Carousel = () => {
    const [datos, setDatos] = useState([]);
    const [slidesToShow, setSlidesToShow] = useState(1);

    useEffect(() => {
        const getDatos = async () => {
            try {
                const response = await fetch(API);
                const data = await response.json();
                setDatos(data);
            } catch (error) {
                console.error(error);
            }
        };

        getDatos();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth < 576) {
                setSlidesToShow(1);
            } else if (windowWidth < 768) {
                setSlidesToShow(2);
            } else if (windowWidth < 990) {
                setSlidesToShow(3);
            } else if (windowWidth < 1200) {
                setSlidesToShow(4);
            } else {
                setSlidesToShow(5);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const primerosDatos = datos.slice(50, 62);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow,
        slidesToScroll: 6
    };
    

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {primerosDatos.map((item, index) => (
                    <div key={index}>
                        <div className="m-3">
                            <div className="card flip-card" style={{
                                width: '12.8em',
                                height: '8.5em',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                                <div className="flip-card-inner">
                                    <div className="flip-card-front">
                                        <img src={item.flags.png} className="card-img-carousel img-fluid object-fit-cover grayscale" alt="..." />
                                    </div>
                                    <div className="flip-card-back d-flex justify-content-center align-items-center">
                                        <div className="text-center lead">{convertirAMayusculas(obtenerPrimeraPalabra(item.name.common))}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;