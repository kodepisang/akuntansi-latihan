'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { PropsWithChildren } from 'react'
import lego from '@/lottie/Lego.json';
import LottieComponents from './LottieComponents';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
interface Props {
    children: React.ReactNode,
    href: string
}

const Links = [
    { name: "Dashboard", href: "/dashboard", role: ['admin', 'user'] },
    { name: "Project", href: "/project", role: ['admin', 'user'] },
    { name: "Activity", href: "/activity", role: ['admin'] },
]

const NavLink = (props: Props) => {
    const { children, href } = props

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={href}>
            {children}
        </Box>
    )
}

const NavbarComponents = ({ user, children }: PropsWithChildren<{ user: User }>) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { post, processing } = useForm();
    const handleLogout = () => {
        post(route('logout'));
    }
    return (
        <Box>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <LottieComponents height={50} width={50} animationData={lego} loop={true} />
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link, index) => {
                                const groupRole = link.role;
                                const role = user.rule;
                                if (groupRole.includes(role)) {
                                    return <NavLink key={index} href={link.href}>{link.name}</NavLink>
                                }
                            })}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Box marginX={5}>
                            <Text fontWeight={"bold"}>{user.name.toUpperCase()}</Text>
                        </Box>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={'storage/asset/user-avatar.jpeg'}
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Profil</MenuItem>
                                <MenuItem>Setting</MenuItem>
                                <MenuDivider />
                                <MenuItem bg={useColorModeValue("white", "gray.900")} _hover={{
                                    bg: useColorModeValue('gray.100', 'gray.900'),
                                }} isDisabled={processing} onClick={handleLogout}>Keluar</MenuItem>
                            </MenuList>
                        </Menu>

                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link, index) => {
                                const groupRole = link.role;
                                const role = user.rule;
                                if (groupRole.includes(role)) {
                                    return <NavLink key={index} href={link.href}>{link.name}</NavLink>
                                }

                            })}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>{children}</Box>
        </Box>
    )
}

export default NavbarComponents;
