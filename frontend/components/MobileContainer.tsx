import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';

export const MobileContainer = ({ children }: { children: React.ReactNode }) => {
    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <View style={styles.phoneFrame}>
                    <View style={styles.dynamicIsland} />
                    <View style={styles.screenContent}>
                        {children}
                    </View>
                </View>
            </View>
        );
    }

    return <>{children}</>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // slate-900 background for desktop
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh' as any, // Ensure full height on web
    },
    phoneFrame: {
        width: 390, // iPhone 14 width
        height: 844, // iPhone 14 height
        backgroundColor: 'black',
        borderRadius: 50,
        borderWidth: 12,
        borderColor: '#334155', // slate-700 frame color
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.5,
        shadowRadius: 40,
    },
    dynamicIsland: {
        position: 'absolute',
        top: 10,
        left: '50%',
        marginLeft: -60,
        width: 120,
        height: 35,
        backgroundColor: 'black',
        borderRadius: 20,
        zIndex: 50,
    },
    screenContent: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 38, // Inner radius to match frame
        overflow: 'hidden',
    },
});
