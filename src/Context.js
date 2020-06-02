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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
        await setData(prevState => ({
            ...prevState,
            [name]: value
        }), console.log(data.type));

    }

    useEffect(() => {
        filterRooms();
    }, [data.type, data.capacity, data.rooms, data.price, data.breakfast, data.pets, data.minSize, data.maxSize])

    const filterRooms = () => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = data;
        console.log(type);
        let tempRooms = [...rooms]; // all the rooms
        capacity = parseInt(capacity);  // transform value
        price = parseInt(price)

        // filter by type
        if (type !== 'all') {
            console.log('I was here')
            tempRooms = tempRooms.filter(room => room.type === type);
        }

        //filter by capacity 
        if (capacity !== 1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        // filter by price
        tempRooms = tempRooms.filter(room => room.price <= price);
        // filter by size
        tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);
        // filter by breakfast
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true);
        }
        // filter by pets
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true);
        }


        // change data
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