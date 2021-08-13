import React, {Component, useState} from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import { categoryOptions, userOptions } from '../../constants/filter';

import { makeStyles, useTheme, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import InputField from '../Forms/InputField';
import SelectField from '../Forms/SelectField';


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
        color : 'black !important',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start'
    },
    select: {
        margin: '0 0 3vw 0',
        borderRadius: '20%',
        width: '100%',
        border: '1px solid rgba(#000, #000, #000, 0.3)'
    },
  }));

function Sidebar(radioChangeHandler, selectChangeHandler ){ 
        const classes = useStyles();
        const [isOpen, setIsOpen] = useState(true);
        const theme=useTheme();
        const toggle = () => setIsOpen(!isOpen);
    
        return(
            <CDBSidebar className={classes.main}>
                <CDBSidebarHeader prefix={ <i className={"fa fa-filter " + classes.filter} /> }   />
                <CDBSidebarContent className={classes.filterArea} >
                    <CDBSidebarMenu className={classes.content}>
                        <CDBSidebarMenuItem  icon="tags">
                            <h5>
                                Price
                            </h5>
                            
                            <InputField icon={<span className="fas fa-coins" />} placeholder="Max 10 BSC" type="number" />
                        </CDBSidebarMenuItem>
                    
                        <hr  style={{margin: '60px 0', border: 'none'}} />

                        <CDBSidebarMenuItem className={""} icon="columns">
                            <CDBSidebarHeader>
                                    Categories
                            </CDBSidebarHeader>
                                <SelectField 
                                    className={classes.select}
                                    options={categoryOptions}
                                    value={categoryOptions[0].key}
                                    onChangeHandler={selectChangeHandler && selectChangeHandler}
                                />
                        </CDBSidebarMenuItem>      
                        
                        <hr  style={{margin: '60px 0', border: 'none'}} />
                        
                        <CDBSidebarMenuItem   className={""} icon="video">
                            <CDBSidebarHeader>
                                Galleries 
                            </CDBSidebarHeader>
                            <SelectField 
                                className={classes.select}
                                options={userOptions}
                                value={userOptions[0].key}
                                onChangeHandler={selectChangeHandler && selectChangeHandler}
                            />
                        </CDBSidebarMenuItem>      
                       
                        <hr  style={{margin: '60px 0', border: 'none'}} />
                       
                        <CDBSidebarMenuItem icon="hive">
                            <Button variant="contained" color="primary">
                                Apply Filter
                            </Button>
                        </CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
            </CDBSidebar>
        )
}

export default Sidebar;