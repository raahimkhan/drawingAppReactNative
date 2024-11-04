import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import ColorPalette from '@components/ColorPalette';
import CanvasOptions from '@components/CanvasOptions';
import CanvasContainer from '@/components/CanvasContainer';
import Canvas from 'react-native-canvas';

const Home: React.FC = () => {

    const ref = useRef<Canvas>(null);

    const [selectedColor, setSelectedColor] = useState('#FF0000');

    return (
        <SafeAreaView style={styles.container}>
            <ColorPalette
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
            />
            <CanvasOptions
                canvasRef={ref}
            />
            <CanvasContainer
                canvasRef={ref}
                selectedColor={selectedColor}
            />
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