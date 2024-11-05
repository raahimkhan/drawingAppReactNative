import Canvas from 'react-native-canvas';

export interface GlobalInformation {
    selectedColor: string;
    canvasRef: React.RefObject<Canvas>;
    canvasHistory: string[];
    canvasHistoryIndex: number;
    penThickness: number;
}