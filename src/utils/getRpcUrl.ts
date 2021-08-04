import random from 'lodash/random';

// Array of available nodes to connect to
// export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3];

export const mainNodes=[process.env.REACT_APP_MAIN_NODE_1, process.env.REACT_APP_MAIN_NODE_2, process.env.REACT_APP_MAIN_NODE_3];
// For Binance

const getNodeUrl = () => {
 // if(process.env.NODE_ENV=="development"){
    const randomIndex = random(0, mainNodes.length - 1);
    return mainNodes[randomIndex];

 // }
  /*else{
  const randomIndex = random(0, nodes.length - 1);
  return nodes[randomIndex];
    }
    */
};

export default getNodeUrl;
