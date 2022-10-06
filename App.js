import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Linking, Platform, StyleSheet, Text, View } from "react-native";


const LinkingPage = () => {
    return (
            <View style={styles.buttonContainer}>
                <Button title="Map" onPress={() => {
                    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=hospitalsaracuruna`)
                }} color="" />
            </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    buttonContainer: {
        margin: 40
    }
});

export default LinkingPage


































// const useMount = func => useEffect(() => func(), []);

// const useInitialURL = () => {
//     const [url, setUrl] = useState(null);
//     const [processing, setProcessing] = useState(true);

//     useMount(() => {
//         const getUrlAsync = async () => {
//             // Get the deep link used to open the app
//             const initialUrl = await Linking.getInitialURL();

//             // The setTimeout is just for testing purpose
//             setTimeout(() => {
//                 setUrl(initialUrl);
//                 setProcessing(false);
//             }, 1000);
//         };

//         getUrlAsync();
//     });

//     return { url, processing };
// };


{/* <Text>
                {processing
                    ? `Processing the initial url from a deep link`
                    : `The deep link is: ${initialUrl || "None"}`}
            </Text> */}
