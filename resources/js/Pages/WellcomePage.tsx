import IllustrationFirstPageComponents from "@/Components/IllustrationFirstPageComponents";
import {
    Flex,
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Icon,
    IconProps,
} from "@chakra-ui/react";

export default function CallToActionWithIllustration() {
    const registre = () => {
        window.location.href = "/register";
    }
    const startPage = () => {
        window.location.href = "/login";
    }
    return (
        <Container maxW={"5xl"}>
            <Stack
                textAlign={"center"}
                align={"center"}
                spacing={{ base: 8, md: 8 }}
                py={{ base: 10, md: 18 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                >
                    LOMBA KOMPETENSI SISWA{" "}
                    <Text as={"span"} color={"orange.400"}>
                        (LKS)
                    </Text>{" "}
                    SMK Kab. Kudus 2024
                </Heading>
                <Text color={"gray.500"} maxW={"3xl"}>
                    "Selamat datang, inovator! Di lomba 'IT Software Solution
                    for Business' ini, kami percaya Anda merupakan generasi Emas
                    kami. Selamat berkompetisi dan semoga sukses!"
                </Text>
                <Stack spacing={6} direction={"row"}>
                    <Button
                        rounded={"full"}
                        px={6}
                        colorScheme={"orange"}
                        bg={"orange.400"}
                        _hover={{ bg: "green.400" }}
                        onClick={startPage}
                    >
                        Get started
                    </Button>
                    <Button rounded={"full"} px={6} onClick={registre} _hover={{ bg: "red.300" }}>
                        Register
                    </Button>
                </Stack>
                <Flex w={"full"}>
                    <IllustrationFirstPageComponents
                        height={{ sm: "18rem", lg: "20rem" }}
                    />
                </Flex>
            </Stack>
        </Container>
    );
}
