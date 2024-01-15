// ProfileScreen.js

import { useRoute } from '@react-navigation/native';
import React from 'react';

import AccountDetails from '../components/AccountDetails';

function ProfileScreen() {
  const route = useRoute();
  const { account } = route.params;


  return (
      <>
        <AccountDetails account={account}/>
    </>
  );
}


export default ProfileScreen;
