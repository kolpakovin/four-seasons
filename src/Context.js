import React, { useState, useEffect } from 'react';
import items from './data';

const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
    const [data, setData] = useState({
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    });

    useEffect(() => {
        let rooms = formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(room => room.price));
        let maxSize = Math.max(...rooms.map(room => room.size));

        setData(prevState => ({
            ...prevState, // if I had more properties this line would be critical!
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize
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

    const getRoom = slug => {
        let tempRooms = [...data.rooms];
        const room = tempRooms.find(room => room.slug === slug);
        return room;
    }

    const handleChange = async event => {
        const target = event.target;
        const value = event.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        await setData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    useEffect(() => {
        filterRooms();
    }, [data.type, data.capacity])

    const filterRooms = () => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = data;
        console.log(type);
        let tempRooms = [...rooms]; // all the rooms
        capacity = parseInt(capacity)  // transform value

        // filter by type
        if (type !== 'all') {
            console.log('I was here')
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        //filter by capacity 
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }
        console.log(tempRooms)
        setData(prevState => ({
            ...prevState,
            sortedRooms: tempRooms
        }))
    }

    return (
        <RoomContext.Provider value={{ ...data, getRoom, handleChange }}>
            {children}
        </RoomContext.Provider>
    )
}

const RoomsConsumer = RoomContext.Consumer;

export const withRoomConsumer = Component => {
    return function ConsumerWrapper(props) {
        return <RoomsConsumer>
            {value => <Component {...props} context={value} />}
        </RoomsConsumer>
    }
}

export { RoomProvider, RoomsConsumer, RoomContext };