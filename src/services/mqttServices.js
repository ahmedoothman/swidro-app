// import { Buffer } from 'buffer';
// import mqtt from 'mqtt';
import { Client, PROTOCOL } from 'paho-mqtt';
import store from '../store';
import { authActions } from '../store/auth-slice';
import axios from 'axios';
import { logDOM } from '@testing-library/react';
// global.Buffer = Buffer;
let api_url = store.getState().auth.api_url;
let model_api_url = store.getState().auth.model_api_url;
// is there a something like the above line but for actions?
// console.log(store);
// updateSwimmer('test');
// const client = new Client('broker.hivemq.com', 8000, 'aonmr');
const client = new Client('localhost', 9001, 'Swidro Platform');
client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log('Connection lost:', responseObject.errorMessage);
  }
};
client.onMessageArrived = async (message) => {
  // log the above but in single object
  const data = {
    topic: message.destinationName,
    message: message.payloadString,
  };
  // collect a 100 reading of x y x z array of 100*3
  // send it to the model api
  // const response = await makeThePredictRequest(#100DATAACC);
  console.log(data);
  store.dispatch(
    authActions.test({
      deviceId: '12345',
      status: 'normal',
      heartRate: 90,
      oxygenSaturation: 90,
      battery: 90,
    })
  );
};
client.connect({
  onSuccess: () => {
    console.log('Connected to MQTT broker');
    client.subscribe('GW1');
  },
  onFailure: (errorMessage) => {
    console.log('Failed to connect:', errorMessage);
  },
  useSSL: false,
});

export const startMqttClient = (data) => {
  // logic
};

const makeThePredictRequest = async (accData) => {
  const data = {
    data: accData,
  };
  try {
    const response = await axios.post(
      `${model_api_url}/api/model/predict`,
      data
    );
    return {
      status: 'success',
      swiimerStatus: response.data.data.swimmerStatus,
    };
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      return {
        status: 'error',
        statusCode: error.code,
        message: error.message + ' Please check your internet connection',
      };
    } else {
      return {
        status: 'error',
        message: error.response.data.message,
      };
    }
  }
};
