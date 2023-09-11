import { Button, Center } from "@chakra-ui/react";

import React from "react";

export const Overlay = () => {
    return (
        <Center
        style={styles.overlay}
        >
        <Button>
            Click
        </Button>
        </Center>
    );
    }
    

const styles = {
    overlay: {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: "1",
    },
};