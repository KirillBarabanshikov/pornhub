import { useQuery } from '@tanstack/react-query';
import { instance } from '@/shared/api';
import { IConfig, IConfigTransform } from '../model';

const useConfigQuery = () => {
    return useQuery<IConfigTransform, Error>({
        queryKey: ['config'],
        queryFn: async () => {
            const response = await instance.get<IConfig>('/config');
            return { config: response.data, updateAspects: [], updateType: '' };
        },
        staleTime: Infinity,
    });
};

export { useConfigQuery };
