import { ReactNode } from 'react';
import { IconProps } from 'phosphor-react-native';
import { VStack, HStack, Text, Box, useTheme } from 'native-base';

type Props = {
    title: string;
    description?: string;
    footer?: string;
    icon: React.ElementType<IconProps>;
    children?: ReactNode;
};

export function CardDetails({
    title,
    description,
    footer = null,
    icon: Icon,
    children
}: Props) {

     const { colors } = useTheme();

  return (
    <VStack bg="#fffaf0" p={5} mt={5} rounded="sm">
        <HStack alignItems="center" mb={4}>
            <Icon color={colors.gray[700]} />
            <Text ml={2} color="gray.700" fontSize="sm" textTransform="uppercase"> 
                {title}
            </Text>
        </HStack>

        {
            !!description &&
            <Text color="gray.700" fontSize="md" >
                {description}
            </Text>
        }

        { children }

        {
            !!footer && 
            <Box borderTopWidth={1} borderBottomColor="#ecfdf5" mt={3}>
                <Text mt={3} color="gray.700" fontSize="sm">
                    {footer}
                </Text>
            </Box>
        }


    </VStack>
  );
}