import { Global } from '@contextAPI/interfaces/Global';

export const GlobalInitialState: Global = {
    GlobalInformation: {
        selectedColor: '#FF0000',
        canvasRef: { current: null },
        canvasHistory: [],
        canvasHistoryIndex: -1,
        penThickness: 1,
        penThicknessButtonClicked: false
    },
};