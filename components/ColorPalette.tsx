import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import {
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { colors } from '@constants/colors';

interface ColorPaletteProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {

    const SQUARES_PER_ROW = 5;
    const rows = Array.from(
        { length: Math.ceil(colors.length / SQUARES_PER_ROW) },
        (_, rowIndex) => colors.slice(rowIndex * SQUARES_PER_ROW, (rowIndex + 1) * SQUARES_PER_ROW)
    );

    return (
        <View style={styles.colorPalette}>
            <View style={styles.gridContainer}>
                {rows.map((row, rowIndex) => (
                    <View key={`row-${rowIndex}`} style={styles.row}>
                        {row.map((color, columnIndex) => (
                            <TouchableOpacity
                                key={`square-${rowIndex}-${columnIndex}`}
                                onPress={() => onColorSelect(color)}
                                style={[
                                    styles.square,
                                    { backgroundColor: color },
                                    color === selectedColor && styles.selectedSquare
                                ]}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    colorPalette: {
        paddingVertical: hp(1.5),
    },
    gridContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: hp(0.5),
    },
    square: {
        width: '15%',
        aspectRatio: 1,
        borderWidth: 0,
    },
    selectedSquare: {
        borderWidth: 2,
        borderColor: 'black',
    },
});

export default memo(ColorPalette);