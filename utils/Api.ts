import { Alert } from 'react-native';

import Api from '../constants/Api';

type onSuccessType = (value: any) => any | PromiseLike<any>

function fetchHelper(method: string, url: string, headers: HeadersInit, body: string, onSuccess?: onSuccessType) {
  fetch(`${Api.url}/${url}`, { method: method, headers: headers, body: body })
    .then((response) => response.json())
    .then((responseJson) => {
      if (onSuccess !== undefined) {
        onSuccess(responseJson)
      }
    })
    .catch((error) => {
      console.warn(error);
      Alert.alert(`Error talking to server: ${JSON.stringify(error)}`);
    });
}

export function post(url: string, payload: any, onSuccess?: onSuccessType) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  fetchHelper('POST', url, headers, JSON.stringify(payload), onSuccess);
}

export function put(url: string, payload: any, onSuccess?: onSuccessType) {
  fetchHelper('PUT', url, { 'Content-Type': 'application/json' }, JSON.stringify(payload), onSuccess);
}

export function get(url: string, onSuccess?: onSuccessType) {
  fetchHelper('GET', url, { 'Accept': 'application/json' }, undefined, onSuccess);
}
