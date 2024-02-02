import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react"

interface Props extends React.HTMLProps<HTMLInputElement>{
    outerClassName?:string;
    passwordIconClassName?:string;
}

const InputComponent:React.FC<Props> = ({outerClassName, passwordIconClassName, ...rest}) => {
    const [inputType, setInputType] = useState<string>(rest.type as string)
    useEffect(()=>{
      setInputType(rest.type as any)
    },[rest.type])
  return (
    <div className={`flex justify-center items-center text-black bg-white p-2 w-full outline-none border-[#128C7E] border-[1px] rounded-md my-2 ${outerClassName}`}>
          <input
            {...rest}
            type={inputType}
          />
          {rest.type==="password"&&<span
            className="cursor-pointer"
            onClick={() =>
              setInputType(inputType === "password" ? "text" : "password")
            }
          >
            {inputType === "password" ? (
              <VisibilityOff className={passwordIconClassName} fontSize="small" />
            ) : (
              <VisibilityIcon className={passwordIconClassName} fontSize="small" />
            )}
          </span>}
        </div>
  )
};

export default InputComponent;
