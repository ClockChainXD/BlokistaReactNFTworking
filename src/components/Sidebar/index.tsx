import React, { useState} from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import { categoryOptions, userOptions } from '../../constants/filter';

import { makeStyles, useTheme, } from '@material-ui/core/styles';

import FilledButton from '../Buttons/FilledButton';
import InputField from '../Forms/InputField';
import SelectField from '../Forms/SelectField';
import toast from 'react-hot-toast';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    filter: {
        fontSize: '20px',
        paddingBottom : '13%'

    },
    filterArea : {
        marginTop: '20px',
    },
    main: {
        background: 'transparent !important',
        color : theme.palette.text.primary + ' !important',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      border: '50px solid rgba(#000, #000, #000, 1)'
    },
    select: {
        margin: '0 0 3vw 0',
        borderRadius: '20%',
        width: '100%',
        border: '50px solid rgba(#000, #000, #000, 1)'
    },
    formField: {
        display: 'flex',
        flexDirection : 'column',
    },
    button: {
        width: '50%',
        margin : '10px auto 10px',
    },
    margin : {
        margin: '90px 0',
    }
  }));
    

  
  interface PropsType {
    onApplyFilter?:Function;
    select3ChangeHandler?: (e) => void;
    select2ChangeHandler?: (e) => void;
  }
function Sidebar({ select2ChangeHandler ,select3ChangeHandler, OnApplyFilter } ){ 

   
    const [category,setCategory]=useState("");
    const [gallery,setGallery]=useState("");
    const [rangeMin,setRangeMin]=useState(0);
    const [rangeMax,setRangeMax]=useState(0);
        const classes = useStyles();
        const [isOpen, setIsOpen] = useState(true);
        /* prefix={ <i className="fa fa-filter" />} */
        const toggle = () => setIsOpen(!isOpen);
    


        const handleSave = () => {
            if (rangeMin < 0) {
              toast.error("You Can't select prices under Zero");
              return;
            }
        
        
            OnApplyFilter(rangeMin,rangeMax);
          };
          
        return(
            
                 <CDBSidebar className={classes.main}>
                <CDBSidebarHeader prefix={ <i className={"fa fa-filter " + classes.filter} /> }   />
                <CDBSidebarContent className={classes.filterArea} >
                    <CDBSidebarMenu className={classes.content}>
                        <CDBSidebarMenuItem  icon="tags">
                            <CDBSidebarHeader>
                                Price
                            </CDBSidebarHeader>
                            <div className={classes.formField}>
                                <InputField name="minBidPrice"
                             onChangeData={val => {
                                    setRangeMax(parseFloat(val));
                                          }} icon={<span className="fas fa-coins" />} placeholder="Max 10 BSC" type="number" />
                                
                                <FilledButton className={classes.button} label={"Apply Price"} handleClick={handleSave} size="medium" />
                            </div>
                               
                                         {/*    <label>Max (ETH)</label>
                                            <input type="number" className="form-control" id="priceMin" placeholder="$0" onChange={e => setMaxPrice(e.currentTarget.valueAsNumber)}/>         */}
                                           
                                       
                               
                            </CDBSidebarMenuItem>
                            <hr className={classes.margin} />

                            <CDBSidebarMenuItem   className={""} icon="columns">
                                <CDBSidebarHeader>
                                      Categories
                                </CDBSidebarHeader>
                                
                                    
                                        <SelectField 
                                            className={classes.select}
                                            options={categoryOptions}
                                            value={categoryOptions[0].label}
                                            onChangeHandler={select3ChangeHandler && select3ChangeHandler}
                                        />
                                      
                                
                            </CDBSidebarMenuItem>      
                            <hr  className={classes.margin} />

                       
                            {/* <CDBSidebarMenuItem   className={""} icon="video">
                            <CDBSidebarHeader>
                                Galleries 
                            </CDBSidebarHeader>
                            <SelectField 
                                className={classes.select}
                                options={userOptions}
                                value={userOptions[0].label}
                                        onChangeHandler={select2ChangeHandler && select2ChangeHandler}
                                    />
                                
                            </CDBSidebarMenuItem>       */}
                                         

                            
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            
        )
}

export default Sidebar;