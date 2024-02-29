
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Link,
    Icon,
    useToast,
} from '@chakra-ui/react';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { FaTrashCan } from 'react-icons/fa6';

interface DeleteComponentProps {
    itemId: string; // Ganti dengan tipe data yang sesuai
    url: string; // Ganti dengan tipe data yang sesuai
}

const DeleteComponent = ({ itemId, url }: DeleteComponentProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const {
        setData,
        delete: destroy,
        processing,
    } = useForm({
        id: itemId,
    });

    const handleOpen = () => {
        // setData('id', itemId);
        // console.log(itemId)
        onOpen();
    }
    const handleDelete: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route(url, {
            id: itemId
        }), {
            onSuccess: () => {
                toast({
                    description: `Data berhasil dihapus`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
                onClose()
            },
            onError: () => toast({
                description: `Data gagal dihapus`,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            }),

        });

    };

    return (
        <div>
            {/* ... your component content ... */}
            <Link
                href="#"
                onClick={handleOpen}
            >
                <Icon as={FaTrashCan} />
            </Link>
            {/* Modal Konfirmasi Hapus */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <form onSubmit={handleDelete}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Konfimasi Hapus Data</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Kamu yakin ingin menghapus data ini?
                        </ModalBody>

                        <ModalFooter>

                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Batal
                            </Button>
                            <Button
                                isLoading={processing}
                                type="submit"
                                loadingText='Submitting'
                                colorScheme='red'
                            >
                                Hapus
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </div>
    );
};

export default DeleteComponent;
