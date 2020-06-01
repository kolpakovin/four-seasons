import React, { useContext } from 'react';
import { RoomContex } from '../Context';

import Loading from './Loading';
import Title from './Title';
import Room from './Room';


const FeaturedRooms = () => {
    let { loading, featuredRooms: rooms } = useContext(RoomContex);
    rooms = rooms.map(room => {
        return <Room key={room.id} room={room} />
    })
    return (
        <section className="featured-rooms">
            <Title title="featured rooms" />
            <div className="featured-rooms-center">
                {loading ? <Loading /> : rooms} 
            </div>
        </section>
    )
}

export default FeaturedRooms;