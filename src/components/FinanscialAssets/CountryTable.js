import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import classes from './CountryTable.module.css';

import { Button } from 'antd';
import AssetItem from "./AssetItem";
import CountryName from './CountryName';
import CountryTableModal from "./CountryTableModal";

const CountryTable = (props) => {
    const COUNTRY = props.countryName;
    const [modalVisible, setModalVisible] = useState(false);

    const store = useSelector(state => {
        return state.assets.countries.find(country => country.name === COUNTRY) //single country extracted
    });

    const openModalHandler = () => {
      setModalVisible(prevState => !prevState);
    }

    let tableContent;
    if(store.assets != 0) {
        tableContent = <React.Fragment>
            {store.assets.map(asset => {
                return (
                    <AssetItem key={asset.id} assetData={asset} countryName={props.countryName}/>
                );
            })}
        </React.Fragment>
    }

  return (
      <div className={classes.container}>
          <CountryName countryId={store.id} countryName={COUNTRY} />
          <table>
              <thead>
                  <tr>
                      <th>Asset name</th>
                      <th>Amount</th>
                      <th>Currency</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
          </table>
          <Button onClick={openModalHandler}>Add asset</Button>
          <CountryTableModal visible={modalVisible} onCancel={openModalHandler} countryName={props.countryName} />
      </div>
  );
}

export default CountryTable;
