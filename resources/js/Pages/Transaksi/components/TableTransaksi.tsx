
import {
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Link,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import { Head, router } from "@inertiajs/react";
import { Icon } from '@chakra-ui/react'
import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import PaginationComponent from "@/Components/Pagination";
import DeleteComponent from "@/Components/ModalHapus";

type PropsTabelTransaksi = {
    dataTable: any;
};
const TabelTransaksi = ({ dataTable }: PropsTabelTransaksi) => {
    // console.log(dataTable);
    const bgColor = useColorModeValue("gray.200", "gray.800");
    const collumns = ["#", "No", "Description", "Debit", "Kredit", "Created At"];
    const curentPage: number = dataTable.current_page ?? 1;
    // const [search, setSearch] = useState("");
    const changePage = (page: string): void => {
        router.get(
            route("batas.index"),
            { page },
            {
                preserveScroll: true,
            }
        );
    };
    // const handleSearch = (e: { preventDefault: () => void }): void => {
    //     e.preventDefault();
    //     router.get(
    //         route("batas.index"),
    //         { search },
    //         {
    //             preserveScroll: true,
    //         }
    //     );
    // };

    const curency = new Intl.NumberFormat('id-ID', {
        // style: 'currency',
        currency: 'IDR',
    });
    return (
        <Stack spacing={3} mb={3}>
            <Flex
                direction={{ base: "column", sm: "row" }}
                gap={2}
                justifyContent="flex-strat"
            >
                <Heading size="md">Data Transaksi</Heading>
                {/* {canCreate && <UserCreate roles={roles} regions={regions} />} */}
            </Flex>
            <TableContainer>
                <Table size="xl" variant="simple" p={2}>
                    <Thead fontSize="medium">
                        <Tr>
                            {collumns.map((collumn, index) => {
                                return (
                                    <Th key={index} bg={bgColor}>
                                        {collumn}
                                    </Th>
                                );
                            })}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dataTable.data.map((items: any, index: number) => {
                            const no = index + 1;
                            const numberX =
                                curentPage <= 1
                                    ? no
                                    : (curentPage - 1) * 10 + no;
                            const amountDebit = items.flag === "debit" ? curency.format(items.amount) : curency.format(0);
                            const amountKredit = items.flag === "kredit" ? curency.format(items.amount) : curency.format(0);
                            const urlDistroy = items.flag === "debit" ? 'dashboard.destroyDebit' : 'dashboard.destroyKredit';
                            return (
                                <Tr key={index}>
                                    <Td>
                                        <HStack spacing={2}>
                                            <Link
                                                href={'#'}
                                            >
                                                <Icon as={HiOutlinePencilAlt} />
                                            </Link>
                                            <DeleteComponent itemId={items.id} url={urlDistroy} />
                                        </HStack>
                                    </Td>
                                    <Td>{numberX}</Td>
                                    <Td>{items.description}</Td>
                                    {/* <Td textAlign="right">{amountDebit}</Td> */}
                                    <Td>
                                        <Box display="flex" justifyContent="space-between">
                                            <span>Rp</span>
                                            <span>{amountDebit}</span>
                                        </Box>
                                    </Td>
                                    <Td>
                                        <Box display="flex" justifyContent="space-between">
                                            <span>Rp</span>
                                            <span>{amountKredit}</span>
                                        </Box>
                                    </Td>
                                    <Td>{items.created_at}</Td>
                                    {/* <Td>{items.updated_at}</Td> */}
                                </Tr>
                            );
                        })}
                    </Tbody>
                    <TableCaption>
                        <PaginationComponent
                            current_page={dataTable.current_page}
                            changePage={changePage}
                            total={dataTable.total}
                        />
                    </TableCaption>
                </Table>
            </TableContainer>
            <Box>
                <Text>
                    Halaman {curentPage} dari {dataTable.last_page}
                </Text>
                <Text>Total Data {dataTable.total}</Text>
                <Text>Menampilkan {dataTable.per_page} per halaman</Text>
            </Box>

        </Stack>
    );
};

export default TabelTransaksi;
