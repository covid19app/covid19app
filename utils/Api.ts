import Config from '../constants/Config';

async function fetchHelper(method: string, url: string, headers: HeadersInit, body: string): Promise<any> {
  return fetch(`${Config.API_SERVER_URL}${url}`, { method, headers, body })
    .then(response => response.json())
    .catch(error => {
      console.warn(error)
      throw error
    })
}

export async function post(url: string, payload: any): Promise<any> {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  return await fetchHelper('POST', url, headers, JSON.stringify(payload))
}

export async function put(url: string, payload: any): Promise<any> {
  return await fetchHelper('PUT', url, { 'Content-Type': 'application/json' }, JSON.stringify(payload))
}

export async function get(url: string): Promise<any> {
  return await fetchHelper('GET', url, { 'Accept': 'application/json' }, undefined)
}

export function getPersonUrl(personId: string): string {
  return `${Config.API_SERVER_URL}/v1/person/${personId}`
}
