import axios from "axios";

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: 'a9ec0fde89cf43729c8cfaf74a176c44',
  }
})