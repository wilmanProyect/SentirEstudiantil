import {create} from 'zustand';

const useUserStore = create((set) => ({
    nombre:"",
    emociones: [],
    setNombre: (nombre) => set({ nombre }),
    addEmocion: (emocion) => set((state) => ({
        emociones: [...state.emociones, emocion]
    })),
    clearEmociones: () => set({ emociones: [] }),
}));

export const useNombre = () => useUserStore(state => state.nombre);
export const useSetNombre = () => useUserStore(state => state.setNombre);
export default useUserStore;