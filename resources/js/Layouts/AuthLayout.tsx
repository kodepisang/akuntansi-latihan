import NavbarComponents from "@/Components/NavbarComponent";
import { User } from "@/types";
import { Box } from "@chakra-ui/react";
import { PropsWithChildren, ReactNode } from "react";

const AuthLayout = ({ user, children }: PropsWithChildren<{ user: User }>) => {
    return (
        <NavbarComponents user={user}>
            {children}
        </NavbarComponents>
    );
}
export default AuthLayout;
