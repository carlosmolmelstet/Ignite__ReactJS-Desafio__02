import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}


interface SideBarProps {
  setSelectedGenre: Dispatch<SetStateAction<number>>;
  selectedGenre: number;

}

export function SideBar({ selectedGenre, setSelectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

 return (
  <nav className="sidebar">
  <span>Watch<p>Me</p></span>
  <div className="buttons-container">
    {genres.map(genre => (
      <Button
        key={String(genre.id)}
        title={genre.title}
        iconName={genre.name}
        onClick={() => setSelectedGenre(genre.id)}
        selected={selectedGenre === genre.id}
      />
    ))}
  </div>

</nav>
)}