export interface IConfigData {
    config: IConfig;
    updateAspects: string[];
    updateType: string;
}

export interface IConfig {
    video_sources: {
        webcam: {
            id: number;
            external_scripts: IScript[];
            show: boolean;
            'z-index': number;
            position: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            resolution: {
                width: number;
                height: number;
            };
            dshow_settings: boolean;
            device_index: number;
            focused: boolean;
        };
        screen: {
            id: number;
            external_scripts: IScript[];
            show: boolean;
            'z-index': number;
            position: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            monitor_index: number;
            region: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            focused: boolean;
        };
    };
    audio_sources: {
        microphone: {
            id: number;
            external_scripts: IScript[];
            show: boolean;
            rate: number;
            chunk: number;
            format: number;
            channels: number;
            device_input_index: number;
            device_output_index: number;
            focused: boolean;
        };
        system_sound: {
            id: number;
            external_scripts: IScript[];
            show: boolean;
            rate: number;
            chunk: number;
            format: number;
            channels: number;
            device_input_index: number;
            device_output_index: number;
            focused: boolean;
        };
    };
}

export interface IScript {
    name: string;
    path: string;
    enabled: boolean;
    args: {
        name: string;
        title: string;
        placeholder: string;
        values: string[];
        value: string;
    }[];
}

export interface ISoundDevice {
    index: number;
    name: string;
    default: boolean;
    deviceType: 'input' | 'output';
    maxInputChannels: number;
    maxOutputChannels: number;
    hostApi: number;
}

export interface IScriptBody {
    scriptArchive?: File;
    source: string;
    action: 'load' | 'delete';
    scriptName: string;
}
