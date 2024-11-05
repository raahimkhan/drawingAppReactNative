import React, { useEffect, useContext, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import ColorPalette from '@components/ColorPalette';
import CanvasOptions from '@components/CanvasOptions';
import CanvasContainer from '@/components/CanvasContainer';
import PenThicknessChanger from '@components/PenThicknessChanger';
import Canvas from 'react-native-canvas';
import { GlobalContext } from '@contextAPI/contexts/GlobalContext';

const Home: React.FC = () => {

    const ref = useRef<Canvas>(null);

    const context = useContext(GlobalContext);
    const { globalState, setGlobalState } = context;
    const { GlobalInformation } = globalState;

    useEffect(() => {
        setGlobalState(prevState => ({
            ...prevState,
            GlobalInformation: {
                ...prevState.GlobalInformation,
                canvasRef: ref,
            }
        }));
    }, []);

    useEffect(() => {
        if (GlobalInformation.penThicknessButtonClicked) {
            const timer = setTimeout(() => {
                setGlobalState(prevState => ({
                    ...prevState,
                    GlobalInformation: {
                        ...prevState.GlobalInformation,
                        penThicknessButtonClicked: false,
                    }
                }));
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [GlobalInformation.penThicknessButtonClicked]);

    return (
        <SafeAreaView style={styles.container}>
            <ColorPalette />
            <CanvasOptions />
            <CanvasContainer />
            {
                GlobalInformation.penThicknessButtonClicked && <PenThicknessChanger />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Home;