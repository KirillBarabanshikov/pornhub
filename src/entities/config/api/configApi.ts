import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/shared/api';
import { IConfig, IConfigData, ISoundDevice, IScriptBody } from '../model';

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

const useScriptMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, IScriptBody>({
        mutationFn: async (body) => {
            const formData = new FormData();

            formData.append('script_archive', body.scriptArchive);
            formData.append('source', body.source);
            formData.append('action', body.action);
            formData.append('script_name', body.scriptArchive.name.split('.zip')[0]);

            const response = await instance.post<{ config: IConfig }>('/script', formData);
            queryClient.setQueryData(['config'], { config: response.data.config, updateAspects: [], updateType: '' });
        },
    });
};

export { useConfigQuery, useSoundDevicesQuery, useScriptMutation };
