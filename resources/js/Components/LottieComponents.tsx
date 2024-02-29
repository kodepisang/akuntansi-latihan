import { Box } from "@chakra-ui/react"
// import city from '@/lottie/city2.json';
import Lottie from "lottie-react";
type LottieProps = {
    animationData: any;
    loop: boolean;
    height: string | number;
    width: string | number;
}
const LottieComponents = ({ animationData, loop, height, width }: LottieProps) => {
    return (
        <Box width={width} height={height}>
            <Lottie animationData={animationData} loop={loop} />
        </Box>
    )
}
export default LottieComponents
