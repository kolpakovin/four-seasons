import React from 'react';
import RoomsFilter from './RoomsFilter';
import RoomsList from './RoomsList';
import { withRoomConsumer } from '../Context';
import Loading from './Loading';

const RoomsContainer = ({ context }) => {
    const { loading, sortedRooms, rooms } = context;
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    );
}

export default withRoomConsumer(RoomsContainer)

// import React from 'react';
// import RoomsFilter from './RoomsFilter';
// import RoomsList from './RoomsList';
// import { RoomsConsumer } from '../Context';
// import Loading from './Loading';

// const RoomsContainer = (props) => {
//     return (
//         <RoomsConsumer>
//             {
//                 value => {
//                     const { loading, sortedRooms, rooms } = value;
//                     console.log(loading)
//                     if (loading) {
//                         return <Loading />
//                     }
//                     return (<div>
//                         Hellog fom Room Container
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                     </div>
//                     );
//                 }
//             }

//         </RoomsConsumer>
//     );
// }

// export default RoomsContainer;