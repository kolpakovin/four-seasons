import React, { useContext } from 'react';

import { RoomContex } from '../Context';
import Loading from './Loading';


const FeaturedRooms = () => {
    const {featuredRooms : rooms} = useContext(RoomContex);
    console.log(rooms)
    return (
        <div>
            from featured rooms
            <Loading />
        </div>
    )
}

export default FeaturedRooms;