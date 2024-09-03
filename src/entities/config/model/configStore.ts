import { create } from 'zustand';

interface IConfigState {
    screenStream: MediaStream | null;
    setScreenStream: (stream: MediaStream) => void;
    clearScreenStream: () => void;
}

const useConfigStore = create<IConfigState>((set) => ({
    screenStream: null,
    setScreenStream: (stream) => set({ screenStream: stream }),
    clearScreenStream: () => set({ screenStream: null }),
}));

export { useConfigStore };
