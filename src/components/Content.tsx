import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}


interface ContentBarProps {
  selectedGenre: number;
  selectedGenreTitle: string;

}

export function Content({ selectedGenre, selectedGenreTitle }: ContentBarProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenre}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre]);

  return (
    <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenreTitle}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
)};