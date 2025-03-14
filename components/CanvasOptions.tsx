import React, { memo, useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Alert
} from 'react-native';
import {
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GlobalContext } from '@contextAPI/contexts/GlobalContext';
import { Image } from 'react-native-canvas';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';

const CanvasOptions: React.FC = () => {

    const context = useContext(GlobalContext);
    const { globalState, setGlobalState } = context;
    const { GlobalInformation } = globalState;

    const clearCanvas = () => {
        if (GlobalInformation.canvasRef.current) {
            const canvas = GlobalInformation.canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setGlobalState(prevState => ({
                    ...prevState,
                    GlobalInformation: {
                        ...prevState.GlobalInformation,
                        canvasHistoryIndex: -1,
                        canvasHistory: []
                    }
                }));
            }
        }
    }

    const undo = async () => {
        const { canvasHistory, canvasHistoryIndex, canvasRef } = GlobalInformation;
        if (canvasHistoryIndex === -1)
            return;
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        if (canvasHistoryIndex === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setGlobalState(prevState => ({
                ...prevState,
                GlobalInformation: {
                    ...prevState.GlobalInformation,
                    canvasHistoryIndex: -1,
                },
            }));
            return;
        }
        const dataURL = canvasHistory[canvasHistoryIndex - 1];
        if (!dataURL)
            return;
        try {
            const image = new Image(canvas);
            image.src = dataURL;
            image.addEventListener("load", () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                setGlobalState(prevState => ({
                    ...prevState,
                    GlobalInformation: {
                        ...prevState.GlobalInformation,
                        canvasHistoryIndex: canvasHistoryIndex - 1,
                    },
                }));
            });
        } catch (error) {
            Alert.alert('Undo operation failed!');
        }
    };

    const redo = () => {
        const { canvasHistory, canvasHistoryIndex, canvasRef } = GlobalInformation;
        if (canvasHistory.length === 0 || canvasHistoryIndex + 1 === canvasHistory.length)
            return;
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const dataURL = canvasHistory[canvasHistoryIndex + 1];
        if (!dataURL)
            return;
        try {
            const image = new Image(canvas);
            image.src = dataURL;
            image.addEventListener("load", () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                setGlobalState(prevState => ({
                    ...prevState,
                    GlobalInformation: {
                        ...prevState.GlobalInformation,
                        canvasHistoryIndex: canvasHistoryIndex + 1,
                    },
                }));
            });
        } catch (error) {
            Alert.alert('Redo operation failed!');
        }
    };

    const enablePenThicknessSlider = () => {
        setGlobalState(prevState => ({
            ...prevState,
            GlobalInformation: {
                ...prevState.GlobalInformation,
                penThicknessButtonClicked: true,
            }
        }));
    }

    const downloadDrawing = async () => {
        const { canvasHistory, canvasHistoryIndex } = GlobalInformation;
        if (canvasHistory.length === 0)
            return;
        const dataURL = canvasHistory[canvasHistoryIndex];
        if (!dataURL)
            return;
        const base64Data = dataURL.split(',')[1];
        const randomNum = Math.floor(Math.random() * 100000000) + 1;
        const filePath = `${RNFS.DocumentDirectoryPath}/drawing_${randomNum}.png`;
        try {
            await RNFS.writeFile(filePath, base64Data, 'base64');
            const shareOptions = {
                title: 'Save/Share Drawing',
                url: `file://${filePath}`,
                type: 'image/png',
            };
            await Share.open(shareOptions);
            Alert.alert('Success', `Drawing saved/shared!`);
        }
        catch (error: any) {
            Alert.alert('Error', 'Failed to save/share the drawing!');
            console.log('Image download error: ', error);
        }
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
            <TouchableHighlight
                onPress={() => enablePenThicknessSlider()}
                underlayColor="#F5F5F5"
            >
                <FontAwesome6
                    name="pencil"
                    size={wp(8.5)}
                    color="black"
                />
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => downloadDrawing()}
                underlayColor="#F5F5F5"
            >
                <AntDesign
                    name="download"
                    size={wp(8.5)}
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