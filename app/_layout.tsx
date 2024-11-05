import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import useLoadFonts from '@hooks/useLoadFonts';
import { Stack } from 'expo-router';
import { GlobalInitialState } from '@contextAPI/initialStates/GlobalInitialState';
import { Global } from '@contextAPI/interfaces/Global';
import { GlobalContext } from "@contextAPI/contexts/GlobalContext";

SplashScreen.preventAutoHideAsync();

const StackLayout = () => {

    const [globalState, setGlobalState] = useState<Global>(GlobalInitialState);

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
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
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
        </GlobalContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default StackLayout;
