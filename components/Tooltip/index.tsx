import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
interface ITooltipProps {
  children?: any;
  title: string;
}
export const TooltipComponent: React.FC<ITooltipProps> = ({
  children,
  title,
}) => {
  return <Tooltip title={title}>{children}</Tooltip>;
};
