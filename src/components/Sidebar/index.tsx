import React, {Component, useState} from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import "./style.css"
import { NavLink } from 'react-router-dom';
import { Collapse, Button, Card, CardBody} from 'reactstrap';
import { categoryOptions, userOptions } from '../../constants/filter';
import SelectField from '../Forms/SelectField';
import { makeStyles } from '@material-ui/core';
import toast from 'react-hot-toast';
import InputField from '../Forms/InputField';
import FilledButton from '../Buttons/FilledButton'
   
let category = [
    {
        id : 1,
        title : 'Mobile',
        quantity : 20  
    },
    {
        id : 2,
        title : 'Pc',
        quantity : 7  
    },
    {
        id : 3,
        title : 'Console',
        quantity : 5  
    },
    {
        id : 4,
        title : 'Tablet',
        quantity : 25  
    }
];

let collections = [
    {
        id: 1,
        picture : 'https://lh3.googleusercontent.com/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE=s64',
        title: 'art blocks curated',
        quantity : 2512,
    },
    {
        id: 2,
        picture : 'https://lh3.googleusercontent.com/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB=s64',
        title: 'Bored Ape Yachy Club',
        quantity : 255,
    },
    {
        id: 3,
        picture : 'https://lh3.googleusercontent.com/d784iHHbqQFVH1XYD6HoT4u3y_Fsu_9FZUltWjnOzoYv7qqB5dLUqpGyHBd8Gq3h4mykK5Enj8pxqOUorgD2PfIWcVj9ugvu8l0=s64',
        title: 'FLUF WORLD',
        quantity : 2125,

    },
    {
        id: 4,
        picture : 'https://lh3.googleusercontent.com/Cc3FG95r-fF8YJVYJ3OkTFCE8jLIY5yECF0Tlum7DckaYC2ZA8hKvm_eD3siPrQS8LoYpUccjbnYCXm_Cj7myBgeAbUwCnJ5XSGf7Ws=s64',
        title: 'Meebits',
        quantity : 125,
    },
]

const useStyles = makeStyles(theme => ({
    main: {
        width: '100vh',
        overflow: 'scroll',

    },
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
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
    button: {
        marginTop: '0  5vw',
        width: '10vw',
        [theme.breakpoints.down('xs')]: {
          width: 76,
          marginTop: 0,
        },
      },
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
            <div>
                <CDBSidebar style={{backgroundColor: 'white', color:'black'}}>
                    <CDBSidebarHeader prefix={ <i className="fa fa-filter" />}  />
                    <CDBSidebarContent >
                        <CDBSidebarMenu className={classes.content}>
                        
                            <CDBSidebarMenuItem className={""} icon="tags">
                                <CDBSidebarHeader>
                                    Price
                                </CDBSidebarHeader>
                                <Collapse className="filter-content" isOpen={isOpen}>
                                <InputField
                                         name="minBidPrice"
                         type="number"
                             onChangeData={val => {
                                    setRangeMax(parseFloat(val));
                                          }}

                                         />
                                         {/*    <label>Max (ETH)</label>
                                            <input type="number" className="form-control" id="priceMin" placeholder="$0" onChange={e => setMaxPrice(e.currentTarget.valueAsNumber)}/>         */}
                                           
                                       
                                </Collapse>
                            </CDBSidebarMenuItem>
                         
                            <Collapse isOpen={isOpen} style={{marginTop: '8em'}}> </Collapse>

                            <CDBSidebarMenuItem   className={""} icon="columns">
                                <CDBSidebarHeader>
                                      Categories
                                </CDBSidebarHeader>
                                
                                <Collapse className="filter-content" isOpen={isOpen}>
                                    
                                        <SelectField 
                                            className={classes.select}
                                            options={categoryOptions}
                                            value={categoryOptions[0].label}
                                            onChangeHandler={select3ChangeHandler && select3ChangeHandler}
                                        />
                                      
                                </Collapse>
                            </CDBSidebarMenuItem>      
                           
                            <Collapse isOpen={isOpen} style={{marginTop: '8em'}}> </Collapse>
                       
                            {/* <CDBSidebarMenuItem   className={""} icon="video">
                                <CDBSidebarHeader>
                                    Galleries 
                                </CDBSidebarHeader>
                                <Collapse className="filter-content" isOpen={isOpen}>
                                    <SelectField 
                                        className={classes.select}
                                        options={userOptions}
                                        value={userOptions[0].label}
                                        onChangeHandler={select2ChangeHandler && select2ChangeHandler}
                                    />
                                </Collapse>
                            </CDBSidebarMenuItem>       */}
                        
                            <Collapse isOpen={isOpen} style={{marginTop: '8em'}}> </Collapse>
                            <CDBSidebarMenuItem>
                                <FilledButton className={classes.button}  label="Apply Price Filter" handleClick={handleSave}/>
                            </CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
            </div>
        )
}

export default Sidebar;