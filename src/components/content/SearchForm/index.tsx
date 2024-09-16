import React, { useState } from 'react';

type SearchFormProps = {
  onSearch: (query: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search tokens..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
