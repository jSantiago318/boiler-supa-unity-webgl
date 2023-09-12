import { Button, Center } from "@chakra-ui/react";

import React from "react";

export const Overlay = () => {
    return (
        <Center
        style={styles.overlay}
        >
        <Button>
            UPRM Interactive Map
        </Button>
        </Center>
    );
    }
    

const styles = {
    overlay: {
        position: "absolute",
        top: "1%",
        left: "1%",
        width: "10%",
        height: "10%",
        zIndex: "1",
    },
};