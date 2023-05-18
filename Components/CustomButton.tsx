import { FC } from "react";
import { Pressable, Text } from "react-native";

interface Props {
    title: string,
    onPressFun: () => void
}

const CustomButton:FC<Props> = ({title, onPressFun}) => {
    return (
        <Pressable onPress={onPressFun}>
            <Text>{title}</Text>
        </Pressable>
    )
}

export default CustomButton;