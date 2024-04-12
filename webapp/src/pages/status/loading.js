import LoadIcon from "../../assets/icons/loadIcon";

const Loading = ({message}) => {
    return(
        <div className="flex flex-col gap-10 text-center items-center place-content-center h-80">
            <div className=" w-16 animate-spin ">
                <LoadIcon/>
            </div>
            <h2 className=" text-green-950">{message}</h2>
        </div>
    );
}

export default Loading;