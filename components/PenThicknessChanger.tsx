import React, { useContext, memo } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { GlobalContext } from '@contextAPI/contexts/GlobalContext';
import Slider from '@react-native-community/slider';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface PenThicknessChangerProps {
    onInteraction: () => void;
}

const PenThicknessChanger: React.FC<PenThicknessChangerProps> = ({ onInteraction }) => {

    const context = useContext(GlobalContext);
    const { globalState, setGlobalState } = context;
    const { GlobalInformation } = globalState;

    const updatePenThickness = (value: number) => {
        setGlobalState(prevState => ({
            ...prevState,
            GlobalInformation: {
                ...prevState.GlobalInformation,
                penThickness: value,
            }
        }));
        onInteraction();
    }

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.sliderValue}> { GlobalInformation.penThickness } </Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={10}
                thumbTintColor="red"
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#000000"
                step={1}
                tapToSeek={true}
                value={GlobalInformation.penThickness}
                onValueChange={value => updatePenThickness(value)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sliderContainer: {
        position: 'absolute',
        top: '60%',
        left: '85%',
        transform: [{ translateX: -100 }, { translateY: -20 }, { rotate: "-90deg" }],
        alignItems: 'center',
    },
    textContainer: {
        transform: [{ rotate: "90deg" }],
        alignItems: 'center'
    },
    slider: {
        width: wp(50),
        height: hp(5),
    },
    sliderValue: {
        fontSize: wp(6),
        color: '#000',
    },
});

export default memo(PenThicknessChanger);