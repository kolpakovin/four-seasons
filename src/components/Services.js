import React, { useState } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from './Title';

const Services = () => {
    const [services, setServices] = useState([
        {
            icon: <FaCocktail />,
            title: "Free Cocktails",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni, corporis!"
        },
        {
            icon: <FaHiking />,
            title: "Endless Hiking",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni, corporis!"
        },
        {
            icon: <FaShuttleVan />,
            title: "Free Shuttle",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni, corporis!"
        },
        {
            icon: <FaBeer />,
            title: "Strongest Beer",
            info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni, corporis!"
        }
    ])
    return (
        <section className="services">
            <Title title="services" />
            <div className="services-center">
                {services.map((item, index) => {
                    return <article key={index} className="service">
                        <span>{item.icon}</span>
                        <h6>{item.title}</h6>
                        <p>{item.info}</p>
                    </article>
                })}
            </div>
        </section>
    )
};

export default Services;