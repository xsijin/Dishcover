import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/searchresult/${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder='Search for a recipe...'
                />
            </form>
        </div>
    );



}

export default SearchBar;