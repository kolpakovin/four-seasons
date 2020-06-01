import React, { useState, useEffect } from 'react';
import items from './data';

const RoomContex = React.createContext();

const RoomProvider = ({ children }) => {
    const [data, setData] = useState({
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true
    });

    useEffect(() => {
        let rooms = formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        setData(prevState => ({
            ...prevState, // if I had more than 4 properties this line would be critical!
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false
        }))
    }, [])

    const formatData = (data) => {
        let tempItems = data.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let room = { ...item.fields, images, id }
            return room;
        });
        return tempItems;
    }


    return (
        <RoomContex.Provider value={{ ...data }}>
            {children}
        </RoomContex.Provider>
    )
}

const RoomsConsumer = RoomContex.Consumer;

export { RoomProvider, RoomsConsumer, RoomContex };