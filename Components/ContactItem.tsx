import { FC } from "react";
import { View, Text } from "react-native";

interface Props {
    name: string,
    phoneNumber: string,
    dateOfBirth?: Date,
    remark?: string
}

const ContactItem:FC<Props> = ({name,phoneNumber}) => {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{phoneNumber}</Text>
        </View>
    )
}

export default ContactItem;