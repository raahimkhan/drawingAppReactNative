import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight
} from 'react-native';
import {
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Canvas from 'react-native-canvas';

interface CanvasOptionsProps {
    canvasRef: React.RefObject<Canvas>;
}

const CanvasOptions: React.FC<CanvasOptionsProps> = ({ canvasRef }) => {

    const clearCanvas = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    const undo = () => {

    }

    const redo = () => {
        
    }

    return (
        <View style={styles.canvasOptions}>
            <TouchableHighlight
                onPress={() => undo()}
                underlayColor="#F5F5F5"
            >
                <Ionicons
                    name="arrow-undo-outline"
                    size={wp(10)}
                    color="black"
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => redo()}
                underlayColor="#F5F5F5"
            >
                <Ionicons
                    name="arrow-redo-outline"
                    size={wp(10)}
                    color="black"
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => clearCanvas()}
                underlayColor="#F5F5F5"
            >
                <Entypo
                    name="eraser"
                    size={wp(10)}
                    color="black"
                />
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    canvasOptions: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
});

export default memo(CanvasOptions);