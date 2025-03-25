import {create} from 'zustand';

const useUserStore = create((set) => ({
    nombre:"",
    setNombre: (nombre) => set({ nombre }),
}));

export default useUserStore;