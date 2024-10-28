import { TailSpin } from "react-loader-spinner";
const LoaderComp = () => {
    return (
        <TailSpin
            height="24"
            width="30"
            color="#FFFFFF"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            
        />
    );
};  
export default LoaderComp;