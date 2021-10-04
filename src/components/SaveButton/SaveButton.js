import React from 'react';

import { useSelector } from 'react-redux';

import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

const SaveButton = () => {
  const store = useSelector(state => state);

  const saveData = () => {
    localStorage.setItem('UserData', JSON.stringify(store));
  }

  return(
      <Button type="dashed" icon={<SaveOutlined />} onClick={saveData} >Save data to localStorage</Button>
  );
}

export default SaveButton;
