import { create } from 'zustand';

interface IConfigState {
    screenStream: MediaStream | null;
    setStream: (stream: MediaStream) => void;
    clearStream: () => void;
}

const useConfigStore = create<IConfigState>((set) => ({
    screenStream: null,
    setStream: (stream) => set({ screenStream: stream }),
    clearStream: () => set({ screenStream: null }),
}));

export { useConfigStore };
