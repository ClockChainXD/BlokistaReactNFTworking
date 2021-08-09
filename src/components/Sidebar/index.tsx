import React, {Component} from 'react'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import { NavLink } from 'react-router-dom';

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
/*  prefix={<i className='fa fa-bars fa-large'></i>} */

class Sidebar extends Component{ 
    render(){
        return(
            <div
                style={{height: '50vh', overflow: 'scroll initial'}}
            >
                <CDBSidebar style={{backgroundColor: 'white', color:'black'}}>
                    <CDBSidebarContent>
                        <div className="container">
                            <CDBSidebarMenu>
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <CDBSidebarMenuItem icon="plus-square">Status</CDBSidebarMenuItem>
                                    </header>
                                    <div className="filter-content" >
                                        <div className="card-body">
                                        <form>
                                            <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <span className="form-check-label">
                                                Buy Now
                                            </span>
                                            </label> 
                                            <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <span className="form-check-label">
                                                New(24 hours)
                                            </span>
                                            </label> 
                                            <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <span className="form-check-label">
                                                Has Offers
                                            </span>
                                            </label>
                                            <label className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" />
                                            <span className="form-check-label">
                                            On Auction
                                            </span>
                                        </label> 
                                    </form>
                                    </div> 
                                    </div>
                                </article> 
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <CDBSidebarMenuItem icon="tags">Price</CDBSidebarMenuItem>

                                    </header>
                                    <div className="filter-content">
                                        <div className="card-body">
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label>Min</label>
                                                    <input type="number" className="form-control" id="inputEmail4" placeholder="$0" />
                                                </div>
                                                <div className="form-group col-md-6 text-right">
                                                    <label>Max</label>
                                                    <input type="number" className="form-control" placeholder="$1,0000" />
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </article> 
                                <article className="card-group-item">
                                    <CDBSidebarMenuItem icon="columns">Categories</CDBSidebarMenuItem>
                                    <div className="filter-content">
                                        <div className="list-group">
                                            {category.map(item => {
                                                console.log(item);
                                                return(
                                                    <NavLink to="" color="red" className="list-group-item" data-id={item.id}>
                                                        {item.title}
                                                        <span className="float-right badge badge-light round">{item.quantity}</span>
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </article>
                                <article className="card-group-item">
                                    <header className="card-header">
                                        <CDBSidebarMenuItem icon="users">Collections</CDBSidebarMenuItem>
                                    </header>
                                    <div className="list-group overflow-auto">
                                                {
                                                    collections.map(item => { console.log(item.title.length);

                                                        item.title = item.title.toLowerCase()
                                                        if(item.title.length > 10){
                                                            item.title = item.title.slice(0, 10) + "...";
                                                            console.log(item.title);
                                                        }

                                                        return(
                                                            <NavLink to={"/"} className="list-group-item" data-id={"collection" + item.id}>
                                                                <div className="custom-control custom-checkbox">
                                                                    <img src={item.picture} style={{float: 'left', width: '30px', borderRadius: '50%', marginRight: '10px'}} />  
                                                                    
                                                                    <p className="text-left">
                                                                        {item.title}
                                                                        <span className="float-right badge badge-light round">
                                                                            {item.quantity}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </NavLink>
                                                            
                                                        )
                                                    })
                                                }
                                            </div>
                                </article>                         
                            </CDBSidebarMenu>
                        </div>
                    </CDBSidebarContent>
        
                    <CDBSidebarFooter>
                        <div
                            className="sidebar-btn-wrapper text-center"
                            style={{padding:'20px 5px'}}
                        >
                            <NavLink
                             to='/'>
                                Blokista
                            </NavLink>
                        </div>
                    </CDBSidebarFooter>
                </CDBSidebar>
        
            </div>
        )
    }
}

export default Sidebar;