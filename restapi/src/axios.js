import axios from "axios";

export default URL = axios.create({
    baseURL: "https://api.github.com/search/users?q=${query}",
});