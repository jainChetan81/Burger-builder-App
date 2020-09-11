import axios from "axios";
const instance = axios.create({
    baseURL: "https://burger-builder-2f6a1.firebaseio.com/",
});
export default instance;
