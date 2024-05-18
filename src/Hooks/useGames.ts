import { useState, useEffect } from "react";
import APIClient from "../services/API-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number,
  name: string,
  slug: string
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const controller = new AbortController();

    APIClient.get<FetchGamesResponse>("/games", { signal: controller.signal})
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message)});

      return() => controller.abort();
}, []); // if you do not include dependency, you will constantly sent request to backend, BIG NO NO
  
return { games, error };

}

export default useGames;