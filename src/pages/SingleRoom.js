import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { RoomContex } from '../Context'

const SinglePage = props => {
    const [slug, setSlug] = useState(props.match.params.slug)
    const [defaultBcgState, setDefaultBcgState] = useState(defaultBcg);
    const contextValue = useContext(RoomContex);
    const { getRoom } = contextValue;
    const room = getRoom(slug);
    if (!room) {
        return <div className="error">
            <h3>no such room could be found...</h3>
            <Link to='/rooms' className="btn-primary">
                back to rooms
            </Link>
        </div>
    }
    const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
    return (
        <Hero hero='roomsHero'>
            <Banner title={`${name} room`}>
                <Link to='/rooms' className='btn-primary'>
                    back to rooms 
                </Link>
            </Banner>
        </Hero>
    )
}

export default SinglePage;