import { useState } from 'react';
import searchSvg from "../assets/icons/fa_search.svg";

const SearchBar = ({ onSearch, loading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="search-bar">
            <img src={searchSvg} alt="" />
            <input
                type="text"
                placeholder="Search City"
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyDown} 
                disabled={loading}
                className="search-input medium-text"

                style={{
                    border: 'none',
                    outline: 'none',
                    fontSize: '18px',
                    color: '#000',
                    width: '100%'
                }}
            />
            {loading && <p className="search-status">Searching...</p>}
        </div>
    );
};

export default SearchBar;