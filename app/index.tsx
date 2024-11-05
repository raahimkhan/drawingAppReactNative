import React, { useEffect, useContext, useRef, useCallback } from 'react';
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
    const interactionTimeout = useRef<NodeJS.Timeout | null>(null);

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

    const startHideTimeout = useCallback(() => {
        if (interactionTimeout.current) {
            clearTimeout(interactionTimeout.current);
        }
        interactionTimeout.current = setTimeout(() => {
            setGlobalState(prevState => ({
                ...prevState,
                GlobalInformation: {
                    ...prevState.GlobalInformation,
                    penThicknessButtonClicked: false,
                }
            }));
        }, 2000);
    }, [setGlobalState]);

    useEffect(() => {
        if (GlobalInformation.penThicknessButtonClicked) {
            startHideTimeout();
        }
    }, [GlobalInformation.penThicknessButtonClicked, startHideTimeout]);

    useEffect(() => {
        return () => {
            if (interactionTimeout.current) {
                clearTimeout(interactionTimeout.current);
            }
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ColorPalette />
            <CanvasOptions />
            <CanvasContainer />
            {
                GlobalInformation.penThicknessButtonClicked && (
                    <PenThicknessChanger onInteraction={startHideTimeout} />
                )
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