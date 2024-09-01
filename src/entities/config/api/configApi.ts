import { useQuery } from '@tanstack/react-query';
import { instance } from '@/shared/api';
import { IConfig, IConfigData, ISoundDevice } from '../model';

const useConfigQuery = () => {
    return useQuery<IConfigData, Error>({
        queryKey: ['config'],
        queryFn: async () => {
            const response = await instance.get<IConfig>('/config');
            return { config: response.data, updateAspects: [], updateType: '' };
        },
        staleTime: Infinity,
    });
};

const useSoundDevicesQuery = () => {
    return useQuery<ISoundDevice[], Error>({
        queryKey: ['soundDevice'],
        queryFn: async () => {
            const response = await instance.get<ISoundDevice[]>('/get_sound_devices');
            return response.data;
        },
        staleTime: Infinity,
    });
};

export { useConfigQuery, useSoundDevicesQuery };
