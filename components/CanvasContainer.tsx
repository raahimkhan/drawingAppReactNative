import React, { useState, useEffect, memo } from 'react';
import {
    StyleSheet,
    View,
    PanResponder
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Canvas from 'react-native-canvas';

interface CanvasContainerProps {
    canvasRef: React.RefObject<Canvas>;
    selectedColor: string;
}

const CanvasContainer: React.FC<CanvasContainerProps> = ({ canvasRef, selectedColor }) => {

    const [isDrawing, setIsDrawing] = useState(false);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = wp(100);
            canvas.height = hp(100);
            ctx.strokeStyle = selectedColor;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
        }
    }, []);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: (e) => {
            setIsDrawing(true);
            setLastX(e.nativeEvent.locationX);
            setLastY(e.nativeEvent.locationY);
        },
        onPanResponderMove: (e) => {
            if (!isDrawing || !canvasRef.current)
                return;
            const ctx = canvasRef.current.getContext('2d');
            ctx.strokeStyle = selectedColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(e.nativeEvent.locationX, e.nativeEvent.locationY);
            ctx.stroke();
            setLastX(e.nativeEvent.locationX);
            setLastY(e.nativeEvent.locationY);
        },
        onPanResponderRelease: () => setIsDrawing(false)
    });

    return (
        <View {...panResponder.panHandlers} style={styles.canvasContainer}>
            <Canvas ref={canvasRef} style={styles.canvas} />
        </View>
    );
}

const styles = StyleSheet.create({
    canvasContainer: {
        flex: 6,
        backgroundColor: '#F5F5F5',
    },
    canvas: {
        backgroundColor: '#F5F5F5'
    }
});

export default memo(CanvasContainer);