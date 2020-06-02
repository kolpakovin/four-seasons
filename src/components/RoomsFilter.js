import React, { useContext } from 'react';
import { RoomContext } from '../Context';
import Title from '../components/Title';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
};

const RoomsFilter = ({ rooms }) => {
    // react hooks
    const contextValue = useContext(RoomContext);
    const {
        handleChange,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = contextValue;


    let types = getUnique(rooms, "type");   // get unique types
    types = ["all", ...types];              // add all
    types = types.map((item, index) => (    // map to jsx
        <option key={index} value={item} >
            {item}
        </option >
    ));
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    });
    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select
                        name="type"
                        id="type"
                        onChange={handleChange}
                        className="form-control"
                        value={type}
                    >
                        {types}
                    </select>
                </div>
                {/* end select type */}
                {/* guests  */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select
                        name="capacity"
                        id="capacity"
                        onChange={handleChange}
                        className="form-control"
                        value={capacity}
                    >
                        {people}
                    </select>
                </div>
                {/* end guests  */}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor="price">room price ${price}</label>
                    <input
                        type="range"
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                {/* end of room price */}
            </form>
        </section >
    );
}

export default RoomsFilter;