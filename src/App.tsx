import { useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    api.get(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data.title);
    })
  }, [selectedGenreId]);


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setSelectedGenre={setSelectedGenreId} selectedGenre={selectedGenreId} />
      <Content selectedGenre={selectedGenreId} selectedGenreTitle={selectedGenre} />
    </div>
  )
}