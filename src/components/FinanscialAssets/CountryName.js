import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {Button, Popover, Input} from "antd";
import {CheckSquareFilled} from '@ant-design/icons';

import * as assetActions from "../../store/actions/assets";
import classes from "./CountryName.module.css";

const CountryName = (props) => {
    const [newName, setNewName] = useState(props.countryName);
    const [editMode, setEditMode] = useState(false);
    const dispatch = useDispatch();


    const deleteCountryHandler = () => {
        dispatch(assetActions.deleteCountry(props.countryId));
    }

    const editCountryHandler = () => {
        setEditMode(true);
    }

    const editNameChangeHandler = (event) => {
        setNewName(event.target.value);
    }

    const confirmEditHandler = () => {
        if(!newName.trim()){
            alert('Input valid name');
            setEditMode(false);
            return;
        }
        dispatch(assetActions.editCountry(props.countryId, newName));
        setEditMode(false);
    }

    const popoverContent = <div className={classes.popoverContainer}>
        <Button onClick={editCountryHandler}>Edit</Button>
        <Button danger onClick={deleteCountryHandler}>Delete</Button>
    </div>;

    let content;
    if(editMode) {
        content = <div className={classes.editContainer}>
            <Input type="text" id="newName" value={newName} onChange={editNameChangeHandler}/>
            <CheckSquareFilled onClick={confirmEditHandler} className={classes.icon} />
        </div>
    } else {
        content = <Popover trigger="click" placement="topLeft" content={popoverContent}>
            <h3>{props.countryName}</h3>
        </Popover>;
    }

  return(
      <Fragment>
          {content}
      </Fragment>
  );
}

export default CountryName;