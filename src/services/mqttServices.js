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
const deviceId = '1';
// object array of all devices that each device has 100*3 array of x y z
const accDataArray = {};
// is there a something like the above line but for actions?
// console.log(store);
// updateSwimmer('test');
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
  console.log(data);
  // collect a 100 reading of x y x z array of 100*3
  // send it to the model api
  // const response = await makeThePredictRequest(#100DATAACC);
  // first get the first  2 char of the message
  const typeOfMessage = data.message.slice(0, 2);
  switch (typeOfMessage) {
    case 'AC':
      const accData = data.message.slice(3).split(',');
      // push the data into the accData array with key deviceId
      // if the array is 100 then send it to the model api
      // update the store with the new data
      // accData[deviceId] = accData[deviceId] || [];
      accDataArray[deviceId] = accDataArray[deviceId] || [];
      if (accDataArray.hasOwnProperty(deviceId)) {
        accDataArray[deviceId].push(accData);
      } else {
        console.error(`Device ID ${deviceId} does not exist in accData.`);
      }
      if (accDataArray[deviceId].length === 100) {
        const response = await makeThePredictRequest(accDataArray[deviceId]);
        console.log(response);
        if (response.status === 'success') {
          // update the store with the new data
          store.dispatch(
            authActions.updateStatusForSwimmer({
              deviceId,
              status: response.swimmerStatus,
            })
          );
        } else {
          console.log(response.message);
        }
      }

      break;
    case 'MA':
      const maData = data.message.slice(3).split(',');
      // update the store with the new data
      store.dispatch(
        authActions.updateHeartRateForSwimmer({
          deviceId,
          hr: maData[1],
        })
      );
      break;
    case 'BA':
      // find swimmer in states that has the same deviceId and update the battery
      store.dispatch(
        authActions.updateBatteryForSwimmer({
          deviceId,
          battery: data.message.slice(3),
        })
      );
      break;
    case 'EM':
      // find swimmer in states that has the same deviceId and update the swimmerStatus with drowning
      store.dispatch(
        authActions.updateStatusForSwimmer({
          deviceId,
          status: 'Drowning',
        })
      );
      break;
  }
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
    client.subscribe('GW1/SWIDRO1/ACC');
  },
  onFailure: (errorMessage) => {
    console.log('Failed to connect:', errorMessage);
  },
  useSSL: false,
});
export const publishMessage = (message) => {
  client.publish('GW1/SWIDRO1/ACC', message);
};
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
      swimmerStatus: response.data.data.swimmerStatus,
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
