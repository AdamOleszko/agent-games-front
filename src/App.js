import { ScoresBar } from './components/ScoresBar'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { accountsSdk } from '@livechat/accounts-sdk';
import {Reacteroids} from './Reacteroids';
import config from './config.js';

const App = () => {
  // const client_id = 'b9a9ce57595f6814655643cbf9ddaa96';
  // const redirectUrl = 'http://localhost:3000';

  const [accessToken, setAccessToken] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('start');

  useEffect(() => {
    const { client_id, account_url } = config;
    accountsSdk.init({
      client_id,
      onIdentityFetched: (error, data) => {
        if (data && data.access_token) {
          console.warn(accessToken);
          setAccessToken(data.access_token);
        } else {
          window.location.href = `${account_url}?response_type=token&client_id=${client_id}&redirect_uri=${
            window.location.href
          }`;
        }
      }
    });
  });

  const handleClick = async () => {
    const test = await axios.get(`${config.server_url}/agents/`, {headers: {'X-API-Version': '2', Authorization: `Bearer ${accessToken}`}});
    console.log(test);
  }


  return (
    <div>
    {currentScreen === 'start' ? 
      <ScoresBar setCurrentScreen={setCurrentScreen}/>
      :
      <Reacteroids />}
      {/* <button onClick={() => {handleClick()}}>Download from livechat API</button> */}
    </div>
  );
};

export default App;