import { useEffect } from 'react'
const GAPI_CONFIG = {
  clientId:
    '136627394553-gfoiotc9iaubftfe3vi3ibdo0hmherj0.apps.googleusercontent.com',
  scope: 'email',
}
const GoogleLoad = () => {
  useEffect(() => {
    const initGapi = async () => {
      const gapi = await import('gapi-script').then((pack) => pack.gapi)
      gapi.load('client:auth2', start)
    }

    async function start() {
      gapi.client.init(GAPI_CONFIG)
    }

    initGapi()
  }, [])

  return ''
}
export default GoogleLoad
