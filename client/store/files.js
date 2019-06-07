import axios from 'axios'
import history from '../history'

const UPLOAD_FILE = 'UPLOAD_FILE'
const uploadFile = file => ({
  type: UPLOAD_FILE,
  file
})

//initial state
const initialState = {
  files: [],
  uploading: false,
  successfulUpload: false
}

export const uploadFileThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/upload')
    dispatch(uploadFile(data))
  } catch (err) {
    console.error(err)
  }
}
