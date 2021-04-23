import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const create = (personObject) => {
    return axios.post(baseUrl, personObject).then(response => response.data)
}

const update = (id, personObject) => {
    return axios.put(`${baseUrl}/${id}`, personObject).then(response => response.data)
}

const deleteObject = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default { getAll, create, update, deleteObject}