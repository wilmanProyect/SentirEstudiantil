import {create} from 'zustand';

const useUserStore = create((set) => ({
    nombre:"",
    edad:"",
    setNombre: (nombre) => set({ nombre }),
    setEdad: (edad) => set({ edad }),
}));

export default useUserStore;