import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { LegacyRef, forwardRef } from "react";
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";

function PaginationComponent({ current_page, total, changePage, children }: {
    current_page: number,
    total: number,
    changePage: (page: string) => void,
    children?: React.ReactNode
}) {
    const Prev = forwardRef((props, ref: LegacyRef<HTMLButtonElement>) => (
        <Button ref={ref} {...props}>
            <FiChevronLeft />
        </Button>
    ));
    const Next = forwardRef((props, ref: LegacyRef<HTMLButtonElement>) => (
        <Button ref={ref} {...props}>
            <FiChevronRight />
        </Button>
    ));
    const Forward = forwardRef((props, ref: LegacyRef<HTMLButtonElement>) => (
        <Button ref={ref} {...props}>
            <FiMoreHorizontal />
        </Button>
    ));
    const Backward = forwardRef((props, ref: LegacyRef<HTMLButtonElement>) => (
        <Button ref={ref} {...props}>
            <FiMoreHorizontal />
        </Button>
    ));
    const Page = forwardRef((props, ref: LegacyRef<HTMLButtonElement>) => (
        <Button ref={ref} {...props}>
            P{children}
        </Button>
    ));

    const itemRender = (_: number | undefined, type: string | undefined) => {
        if (type === "prev") {
            return Prev;
        }
        if (type === "next") {
            return Next;
        }
        if (type === "forward") {
            return Forward;
        }
        if (type === "backward") {
            return Backward;
        }

    };

    return (
        <Flex
            justifyContent="flex-end"
        >
            <Pagination
                pageNeighbours={2}
                defaultCurrent={current_page}
                paginationProps={{
                    display: "flex",
                }}
                baseStyles={{
                    bg: useColorModeValue("white", "gray.800"),
                }}
                total={total}
                size="sm"
                // @ts-ignore
                onChange={changePage}
                colorScheme="facebook"
                itemRender={itemRender}

            />
        </Flex>
    );
}

export default PaginationComponent;
