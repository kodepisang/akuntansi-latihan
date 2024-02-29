

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react'
type dataProps = {
    user: string,
    email: string,
    kredit: number,
    debit: number,
    balance: number,
}
const CardBalanceComponent = ({ user, email, kredit, debit, balance }: dataProps) => {
    const curency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });
    return (

        <Box
            maxW={'350px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Image
                h={'120px'}
                w={'full'}
                src={'storage/asset/latar.png'}
                objectFit="cover"
                alt="#"
            />
            <Flex justify={'center'} mt={-12}>
                <Avatar
                    size={'xl'}
                    src={'storage/asset/user-avatar.jpeg'}
                    css={{
                        border: '2px solid white',
                    }}
                />
            </Flex>

            <Box p={6}>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        {user}
                    </Heading>
                    <Text color={'gray.500'}>{email}</Text>
                </Stack>
                <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                        {curency.format(balance)}
                    </Heading>
                    <Text fontSize={'sm'} color={'gray.500'}>
                        Saldo
                    </Text>
                </Stack>
                <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{curency.format(debit)}</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Debit
                        </Text>
                    </Stack>
                    <Stack spacing={0} align={'center'}>
                        <Text fontWeight={600}>{curency.format(kredit)}</Text>
                        <Text fontSize={'sm'} color={'gray.500'}>
                            Kredit
                        </Text>
                    </Stack>
                </Stack>
            </Box>
        </Box>

    )
}


export default CardBalanceComponent;
