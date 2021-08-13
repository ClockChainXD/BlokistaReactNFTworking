import React, { useEffect, useState } from 'react';

import FilterSection from '../../components/Filters/FilterSection';
import ProductCard from '../../components/Cards/ProductCard';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';


import SubTitle1 from '../../components/Typography/Subtitle1';
import { useGetNFTObjectDetail, useGetNFTObjectList } from '../../hooks/useApi';
import useStyles from './style';
import { NFTObjectData } from '../../hooks/useApi';
import Sidebar from '../../components/Sidebar';
import Filter from '../../components/Filters/Filter';
import { SettingsCellOutlined, TextRotationAngleupOutlined } from '@material-ui/icons';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import toast from 'react-hot-toast';
import { Box } from '@material-ui/core';

const LIST_SIZE = 8;
const Explore = () => {
  const classes = useStyles();
  const [NFTListData, setNFTListData] = useState<NFTObjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [sortField, setSortField]=useState("createdAt");
  const[sortOrder,setSortOrder]=useState("desc");
  const[category,setCategory]=useState("");
  const[subcategory,setSubCategory]=useState("");
  const[count,setCount]=useState(8);
  const[rangeMin,setRangeMin]=useState(0);
const [status,setStatus]=useState(3);
  const[rangeMax,setRangeMax]=useState(100000);


  const breakpointColumnsObj = {
    default: 4,
    900: 4,
    700: 3,
    500: 1,
  };

  const totalNFTListData = useGetNFTObjectList({ count: count, sortField: sortField, sortOrder: sortOrder, category: category,subcategory:subcategory,rangeMin: rangeMin, rangeMax: rangeMax, status: status });

  function isAlreadyAdded(item: NFTObjectData) {
    return NFTListData?.find(list => list.baseID === item.baseID);
  }

  useEffect(() => {

    console.log("this is length  :" + totalNFTListData?.nftList?.length);
    console.log("This is items: " + NFTListData.length);
    if (totalNFTListData?.nftList?.length) {
      let totalList=totalNFTListData.nftList;

      let newNFTObjectList = [...NFTListData];
    /*  if (!totalNFTListData?.nftList.find(item => isAlreadyAdded(item))) {
        newNFTObjectList.push(...totalNFTListData.nftList);
        setLoading(false);
      }
      else{*/
        /*
      totalList.forEach(item => {
        console.log(newNFTObjectList.splice(newNFTObjectList.findIndex(list => list.baseID === item.baseID),1))
      }
        );
       */
       /* newNFTObjectList.forEach(item => {
          
          if(totalList.findIndex(list => list.baseID === item.baseID)===-1){
          newNFTObjectList.splice(newNFTObjectList.findIndex(x=> x.baseID===item.baseID));
        }
        else{
        totalList.splice(totalList.findIndex(x=> x.baseID===item.baseID))
        }
        }
          );
          */
          newNFTObjectList=totalList;
       setLoading(false);

    //  }
      setNFTListData(newNFTObjectList);
    }
    else if(totalNFTListData?.nftList?.length==0){
       setNFTListData([]);
       setLoading(false);
    }
  }, [totalNFTListData]);

 
  function loadMoreNFTs() {
    setLoading(true);
    setCount(8+totalNFTListData.totalCount)
    // setStart(start + NFTListData.length);
  }
  
  function filterIt(filterProp){
    setLoading(true);
    setSortField("createdAt");
    console.log(filterProp);
    if(filterProp==2){

setSortOrder('desc');
    }
    else if(filterProp==1){
 
    setSortOrder('asc');
  }
  setStart(0);

}
function sidebarFilter(filterProp){
  setLoading(true);
  setCategory(filterProp);

  setStart(0);

  console.log(filterProp);

  
}
function sidebarGalleryFilter(filterPropa){
  setLoading(true);
  setSubCategory(filterPropa);

  setStart(0);

  console.log(filterPropa);

  
}
function filterRadio(filterPropi){
  setLoading(true);
  if(filterPropi=="buy_now"){
    setStatus(2);

  }
  else if(filterPropi=="auction"){
    setStatus(1);
  }
  else if(filterPropi=="all"){
    setStatus(3);
  }
  // else if(filterPropi=="new"){
  //   setNFTListData(NFTListData.filter(item => item.createdAt > Date.now()-10000));
  // }
  // else if(filterPropi=="has_offers"){
  //   let newList;
  //   NFTListData.forEach( item => {
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const nftObjectDetail = useGetNFTObjectDetail(item.baseID);
    
  //     if(nftObjectDetail?.bids?.length){

  //       newList.push(item);
  //   }
  //   }

  //   )

  //   setNFTListData(newList);

  // }
}
const filterPrice = async (rangeMin,rangeMax) => {
  if(rangeMax){
  setLoading(true);
  setRangeMin(rangeMin);
 setRangeMax(rangeMax);
 setStart(0);

  console.log(rangeMax);
}
else{
  console.log("FUCK");
}

//setRangeMin(filterProp);
  

}
/*
useEffect(() => {
  if (totalNFTListData?.totalCount>0) {
    let newNFTObjectList=[];
    if (!totalNFTListData?.nftList.find(item => isAlreadyAdded(item))) {
      newNFTObjectList=totalNFTListData.nftList;
      setLoading(false);
    
    setNFTListData(newNFTObjectList);
  }
}
  else{
    setNFTListData([])
  }
 
}, [rangeMin,rangeMax,category,subcategory]);



filterRadio(e.target.value)
*/
  return (
    <div className={classes.root}>
        <Sidebar
        OnApplyFilter={filterPrice}
         select3ChangeHandler={e => sidebarFilter(e.target.value)}
         select2ChangeHandler={e => sidebarGalleryFilter(e.target.value)}
        />
        <div className={classes.root + " " +classes.secondRoot} >
          
          <div className={classes.topFilter}>
            <FilterSection
              selectChangeHandler={e => console.log(e.target.value)}
              radioChangeHandler={e => console.log(e.target.value)}
            />
          </div>

          <Box display="flex" flexWrap="wrap">
            {NFTListData?.map((product, index) => (
                <div key={index} className={classes.productWrapper}>
                  <ProductCard product={product}  />
                </div>
              ))}
          </Box>
            {totalNFTListData?.totalCount > NFTListData.length && (
              <div className={classes.loadBtn}>
                <LoadMoreButton isLoading={loading} loadMore={loadMoreNFTs} />
              </div>
            )}
        
        </div>
    </div>
  );
};

Explore.propTypes = {};

Explore.defaultProps = {};

export default Explore;
