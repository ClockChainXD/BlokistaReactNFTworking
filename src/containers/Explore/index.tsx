import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';

import Container from '../../components/Layout/Container';
import FilterSection from '../../components/Filters/FilterSection';
import ProductCard from '../../components/Cards/ProductCard';
import LoadMoreButton from '../../components/Buttons/LoadMoreButton';


import SubTitle1 from '../../components/Typography/Subtitle1';
import { useGetNFTObjectList } from '../../hooks/useApi';
import useStyles from './style';
import { NFTObjectData } from '../../hooks/useApi';
import Sidebar from '../../components/Sidebar';
import Filter from '../../components/Filters/Filter';

const LIST_SIZE = 8;
const Explore = () => {
  const classes = useStyles();
  const [NFTListData, setNFTListData] = useState<NFTObjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);

  const breakpointColumnsObj = {
    default: 4,
    900: 4,
    700: 3,
    500: 1,
  };

  const totalNFTListData = useGetNFTObjectList({ start, count: LIST_SIZE, sortField: 'createdAt', sortOrder: 'desc', category: '' });

  function isAlreadyAdded(item: NFTObjectData) {
    return NFTListData?.find(list => list.baseID === item.baseID);
  }

  useEffect(() => {
    if (totalNFTListData?.nftList?.length) {
      const newNFTObjectList = [...NFTListData];
      if (!totalNFTListData?.nftList.find(item => isAlreadyAdded(item))) {
        newNFTObjectList.push(...totalNFTListData.nftList);
        setLoading(false);
      }
      setNFTListData(newNFTObjectList);
    }
  }, [totalNFTListData]);

  function loadMoreNFTs() {
    setLoading(true);
    setStart(start + LIST_SIZE);
  }

  return (
    <div className={classes.root}>
        <Sidebar />
        <div className={classes.root + " " +classes.secondRoot} >
          
          <div className={classes.topFilter}>
            <FilterSection
              selectChangeHandler={e => console.log(e.target.value)}
              radioChangeHandler={e => console.log(e.target.value)}
            />
          </div>

          <div className="d-flex flex-row w-50">
            <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonry + " ml-5"} style={{width:"100%", height:'100%',}}  columnClassName={classes.gridColumn}>
              {NFTListData?.map((product, index) => (
                <div key={index} className={classes.productWrapper}>
                  <ProductCard product={product} />
                </div>
              ))}
            </Masonry>
            {totalNFTListData?.totalCount > NFTListData.length && (
              <div className={classes.loadBtn}>
                <LoadMoreButton isLoading={loading} loadMore={loadMoreNFTs} />
              </div>
            )}
          </div>
        
        </div>
    </div>
  );
};

Explore.propTypes = {};

Explore.defaultProps = {};

export default Explore;
