import { useQuery } from '@tanstack/react-query';
import { instance } from '@/shared/api';
import { IConfig } from '../model';

const useConfigQuery = () => {
    return useQuery<IConfig, Error, void>({
        queryKey: ['config'],
        queryFn: () => {
            return instance.get('/config');
        },
        staleTime: Infinity,
    });
};

export { useConfigQuery };
