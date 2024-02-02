import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsChevronDown } from 'react-icons/bs';

interface IAccordianProps{
    heading:string;
    body:any;
    darkMode:boolean;
    defaultOpen?:boolean
}

const AccordianComponent:React.FC<IAccordianProps>=({heading, body, darkMode, defaultOpen})=>{
  return (
    <div className='m-2'>
      <Accordion defaultExpanded={defaultOpen || false} className={`${darkMode && " !bg-[#2a2a31] !text-gray-200"}`}>
        <AccordionSummary
          expandIcon={<BsChevronDown color={` ${darkMode?"#E5E7EB":"#2a2a31"} `} strokeWidth={1}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{heading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {body}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default AccordianComponent