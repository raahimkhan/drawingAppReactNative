import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/useLoadFonts';
import { Stack } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {

    const fontsLoaded = useLoadFonts();

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const options = {
        headerShown: false
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View
            style={styles.container}
            onLayout={onLayoutRootView}
        >
            <Stack>
                <Stack.Screen
                    name="index"
                    options={options}
                />
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default StackLayout;
