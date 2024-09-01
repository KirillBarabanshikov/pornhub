export interface IConfigData {
    config: IConfig;
    updateAspects: string[];
    updateType: string;
}

export interface IConfig {
    video_sources: {
        webcam: {
            id: number;
            external_scripts: never[];
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
            external_scripts: never[];
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
            external_scripts: never[];
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
            external_scripts: never[];
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
    // virtual_camera: {
    //     external_scripts: [];
    //     width: 1920;
    //     height: 1080;
    //     fps: 30;
    //     backend: 'unitycapture';
    //     device: 'Unity Video Capture';
    // };
    // virtual_audio: {
    //     external_scripts: [];
    //     input_device_name: 'CABLE Input';
    //     output_device_name: 'CABLE Output';
    //     index_input: 4;
    //     index_output: 1;
    // };
    // sound_player: {
    //     audio_state: 'pause';
    //     source_path: 'C:\\projects\\pornhub\\sound\\shaman.mp3';
    //     device_output_index: 4;
    //     external_scripts: [];
    //     format: 2;
    //     channels: 2;
    //     rate: 44100;
    //     chunk: 1024;
    // };
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
