import React, { useContext } from 'react';

import { RoomContex } from '../Context';

const FeaturedRooms = () => {
    const {featuredRooms} = useContext(RoomContex);
    console.log(featuredRooms)
    return (
        <div>
            from featured rooms
        </div>
    )
}

export default FeaturedRooms;