import React, { useState } from 'react';

const RoomContex = React.createContext();

const RoomProvider = ({ children }) => {
    return (
        <RoomContex.Provider value="hello">
            {children}
        </RoomContex.Provider>
    )
}

const RoomsConsumer = RoomContex.Consumer;

export { RoomProvider, RoomsConsumer, RoomContex };