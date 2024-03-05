import AuthLayout from '@/Layouts/AuthLayout'
import { PageProps } from '@/types'
import {
    Avatar,
    Box,
    chakra,
    Container,
    Flex,
    Icon,
    SimpleGrid,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";


type dataProps = {

    description: string;
    userName: string;
    event: string;
    logName: string;
    property: string;
    role: string;
    createdAd: string;
}

function TestimonialCard(props: dataProps) {
    const { description, role, userName, event, logName, property, createdAd } = props
    const formattedDate = (dateString: string) => {
        const parsedDate = parseISO(dateString);
        const formattedString = format(parsedDate, "d MMMM yyyy, HH:mm:ss");
        return formattedString;
    };
    return (
        <Flex
            boxShadow={'lg'}
            maxW={'640px'}
            direction={{ base: 'column-reverse', md: 'row' }}
            width={'full'}
            rounded={'xl'}
            p={5}
            justifyContent={'space-between'}
            position={'relative'}
            bg={useColorModeValue('gray.100', 'gray.800')}
        >
            <Flex direction={'column'} textAlign={'left'} justifyContent={'space-between'}>
                <chakra.p fontFamily={'Work Sans'} fontWeight={'bold'} fontSize={16}>
                    {userName}
                    <chakra.span fontFamily={'Inter'} fontWeight={'medium'} color={'gray.500'}>
                        {' '}
                        - {role}
                    </chakra.span>
                </chakra.p>
                <chakra.p fontFamily={'Inter'} fontWeight={'medium'} fontSize={'15px'} >
                    Log name : {logName}
                </chakra.p>
                <chakra.p fontFamily={'Inter'} fontWeight={'medium'} fontSize={'15px'} pb={2}>
                    {description}  <chakra.span fontFamily={'Inter'} fontWeight="bold" >
                        {' '}
                        - {event}
                    </chakra.span>
                </chakra.p>
                <chakra.p fontFamily={'Inter'} fontWeight={'medium'} fontSize={'15px'} pb={4}>
                    <pre>property:{JSON.stringify(JSON.parse(property), null, 2)}</pre>
                </chakra.p>
                <chakra.p fontFamily={'Inter'} fontWeight={'medium'} fontSize={'15px'} pb={2}>
                    Created At  :<chakra.span fontFamily={'Inter'} fontWeight="bold" >
                        {' '} {formattedDate(createdAd)}

                    </chakra.span>
                </chakra.p>

            </Flex>

        </Flex>
    )
}

const AvtivityPage = ({ auth, data }: PageProps<{ data: any }>) => {
    // console.log(data)
    const [actyvityData, setActivityData] = useState<any>([]);
    const [isAutoRefresh, setIsAutoRefresh] = useState(false);
    const handleToggle = () => {
        setIsAutoRefresh(!isAutoRefresh);
    };
    useEffect(() => {
        setActivityData(data);
        let timer: NodeJS.Timeout | null = null;

        if (isAutoRefresh) {
            timer = setInterval(() => {
                window.location.reload();
            }, 5000); // Reloads page every 5 seconds
        }
        // Cleanup function to clear the interval when the component unmounts or when auto-refresh is turned off
        return () => clearInterval(timer!);
    }, [isAutoRefresh])
    return (
        <AuthLayout user={auth.user}>
            <Flex
                textAlign={'center'}
                pt={10}
                justifyContent={'center'}
                direction={'column'}
                width={'full'}
                overflow={'hidden'}>
                <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'}>
                    <chakra.h1
                        py={5}
                        fontSize={48}
                        fontFamily={'Work Sans'}
                        fontWeight={'bold'}
                        color={useColorModeValue('gray.700', 'gray.50')}>
                        Activity Log User
                    </chakra.h1>
                </Box>
                <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'} pb={3}>
                    <FormControl display="flex" alignItems="start">
                        <FormLabel htmlFor="auto-refresh" mb="0">
                            Auto Refresh Page
                        </FormLabel>
                        <Switch id="auto-refresh" isChecked={isAutoRefresh} onChange={handleToggle} />
                    </FormControl>
                </Box>
                <VStack spacing={4} align='center'>

                    {actyvityData.map((item: any, index: number) => {
                        console.log(item);
                        return <TestimonialCard key={index}
                            userName={item.user.name} logName={item.log_name}
                            description={item.description} role={item.user.rule}
                            property={item.properties} event={item.event} createdAd={item.created_at} />
                    })}
                </VStack>

            </Flex>
        </AuthLayout>
    )
}

export default AvtivityPage;
