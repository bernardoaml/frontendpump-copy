"use client";
import React, { useState, useEffect } from 'react';
import { fetchTokens } from '@services/tokenService';
import '../TokenList/styles.css'
import SearchForm from '../SearchForm';



const TokenList = () => {
  const [tokens, setTokens] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    telegram: false,
    website: false,
    twitter: false,
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getTokens = async () => {
      const { data, totalPages } = await fetchTokens(page, filters, searchQuery);
      setTokens(data);
      setTotalPages(totalPages);
    };

    getTokens();
  }, [page, filters, searchQuery]);

  const handleFilterChange = (filter: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filter]: !prevFilters[filter as keyof typeof prevFilters],
    }));
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPage = Number(e.target.value);
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);  // Resetar para a primeira página ao fazer uma nova pesquisa
  };

  return (
    <div className="mx-auto mt-5 max-w-7xl">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="py-10 text-3xl font-extrabold">All Tokens</h1>
        </div>
        <div>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {tokens.map((token: any) => (
          <div className="flex flex-col" key={token.id}>
            <img
              src={token.image || '/default-image.jpg'}
              alt={token.name}
              className="h-full w-full aspect-[1/1]"
            />
            <h2 className="text-maincolor mt-2 font-poppins text-lg">
              {token.name}
            </h2>
            <p className="text-blackcolor text-sm">{token.symbol}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >
          Previous
        </button>

        <div className="flex items-center">
          <span>Página {page} de {totalPages}</span>
          <input
            type="number"
            value={page}
            onChange={handlePageChange}
            className="ml-2 w-16 p-1 border rounded"
          />
        </div>

        <button
          onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <label className="mr-4">
          <input
            type="checkbox"
            checked={filters.telegram}
            onChange={() => handleFilterChange('telegram')}
          />
          Telegram
        </label>
        <label className="mr-4">
          <input
            type="checkbox"
            checked={filters.website}
            onChange={() => handleFilterChange('website')}
          />
          Website
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.twitter}
            onChange={() => handleFilterChange('twitter')}
          />
          Twitter
        </label>
      </div>
    </div>
  );
};

export default TokenList;