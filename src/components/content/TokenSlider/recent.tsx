'use client';

import {Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Token {
  image_uri: string;
  name: string;
  symbol: string;
}

const TokenSliderRecent = () => {
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);
  useEffect(() => {
    axios.get('/api/allTokens')
      .then(response => {
        const tokenData = response.data.map((token: Token) => ({
          image_uri: token.image_uri,  // URL da imagem
          name: token.name,  // Nome do token
          symbol: token.symbol,  // Símbolo do token
        }));
        setRecentTokens(tokenData);  // Atualizar o estado com os tokens recebidos
      })
      .catch(error => console.error('Erro ao buscar os tokens:', error));
  }, []);
  return (
    <>
      <div className="mx-auto mt-5 max-w-7xl">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="font-bold font- py-10 text-3xl">
              Most Recent
            </h1>
          </div>

          <div>
            <nav className="navigation font-lexend">
              <a href="#" className="navigation-item active">Last</a>
              <a href="#" className="navigation-item">5 min</a>
              <a href="#" className="navigation-item">30 min</a>
              <a href="#" className="navigation-item">1 hour</a>
            </nav>
          </div>
        </div>

        <Splide
          options={{ perPage: 6, gap: 26 }}
          aria-label="King of The Hill"
          className="hidden lg:flex"
          data-aos="zoom-in-up"
          data-aos-delay="100"
          data-aos-duration="1500"
        >
          {recentTokens.length > 0 ? (
            recentTokens.map((token, index) => (
              <SplideSlide key={index}>
                <div className="flex flex-col">
                  <img
                    src={token.image_uri}
                    alt={token.name}
                    className="h-full w-full"
                    onError={(e) => (e.currentTarget.src = '/default-image.png')}  // Handle broken images
                  />
                  <h2 className="text-maincolor mt-2 font-poppins text-lg">
                    {token.name}
                  </h2>
                  <p className="text-blackcolor text-sm">{token.symbol}</p>
                </div>
              </SplideSlide>
            ))
          ) : (
            <p>Loading tokens...</p>  // Mensagem enquanto os tokens carregam
          )}
        </Splide>
      </div>
    </>
  );
};

export default TokenSliderRecent;