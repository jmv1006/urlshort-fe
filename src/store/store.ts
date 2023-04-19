import { reactive } from "vue"
import UserInterface from "../Config/Interfaces/UserInterface";
import URLSave from "../Config/Interfaces/UrlSave";

interface IAppState {
    user: UserInterface | null,
    userSaves: Array<URLSave>
}

const AppState: IAppState = reactive({
    user: null,
    userSaves: []
})

const useStore = () => {
    const getUser = () => {
        return AppState.user;
    }

    const setUser = (user: UserInterface) => {
        AppState.user = user;
    }

    const getURLSaves = () => {
        return AppState.userSaves;
    }

    const setURLSaves = (saves: Array<URLSave>) => {
        AppState.userSaves = saves;
    }

    return { getUser, setUser, getURLSaves, setURLSaves };
}

export default useStore;