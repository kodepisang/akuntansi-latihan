import CardBalanceComponent from "@/Components/CardBalanceComponent";
import AuthLayout from "@/Layouts/AuthLayout";
import { PageProps } from "@/types";
import { Box, Stack } from "@chakra-ui/react";
import TabelTransaksi from "./components/TableTransaksi";
import { useEffect, useState } from "react";
type dasbord = {
    user: string,
    email: string,
    kredit: number,
    debit: number,
    balance: number
}
const DashbordPage = ({ auth, data, dasbord }: PageProps<{ data: any, dasbord: any }>) => {
    // console.log(data)
    // console.log(dasbord)
    const [dasbordData, setDasbordData] = useState<dasbord>(
        {
            user: "-",
            email: "-",
            kredit: 0,
            debit: 0,
            balance: 0
        }
    );
    useEffect(() => {
        setDasbordData({
            user: dasbord.user_name,
            email: auth.user.email,
            kredit: dasbord.total_kredit,
            debit: dasbord.total_debit,
            balance: dasbord.total_saldo
        })
        // console.log(dasbordData)
    }, [])
    return (
        <>
            <AuthLayout
                user={auth.user}
            >
                <Stack spacing='24px' direction={['column', 'row']}>
                    <CardBalanceComponent
                        user={dasbordData.user}
                        email={dasbordData.email}
                        balance={dasbordData.balance}
                        debit={dasbordData.debit}
                        kredit={dasbordData.kredit}
                    />
                    <Box bg='grey.500' w={'full'}>
                        <TabelTransaksi dataTable={data} />
                    </Box>

                </Stack>

            </AuthLayout>

        </>
    )
}
export default DashbordPage;
