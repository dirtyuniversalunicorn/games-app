import { useState, useEffect } from 'react';
import APIClient from '../services/API-client';
import { CanceledError } from 'axios';


interface Genre {
  id: number;
  name: string;
}


interface FetchGenresResponse {
  count: number;
  results: Genre[]
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  
  useEffect(() => {
    const controller = new AbortController();


  setLoading(true);
  APIClient.get<FetchGenresResponse>("/genres", { signal: controller.signal})
    .then((res) => {
      setGenres(res.data.results);
      setLoading(false);
    })
    .catch((err) => {
      if (err instanceof CanceledError) return;
      setError(err.message)
      setLoading(false);
    });

      return() => controller.abort();
}, []); // if you do not include dependency, you will constantly sent request to backend, BIG NO NO
  
return { genres, error, isLoading };
};

export default useGenres;