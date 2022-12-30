import axios from 'axios'
const baseUrl = '/service/cities'

// eslint-disable-next-line no-unused-vars

const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const exportedObject = {getAll};
  export default exportedObject