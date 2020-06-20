import { USER } from '../consts'
import { getRandomUser } from '../../API/randomUser'

const createUser = user => async dispatch => {
  try {
    dispatch({
      type: USER.CREATE_USER,
      payload: user,
    })
  } catch (error) {
    console.log(error)
  }
}

const createRandomUser = () => async dispatch => {
  try {
    const data = await getRandomUser()

    dispatch({
      type: USER.CREATE_RANDOM_USER,
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
}


const updateUser = user => async dispatch => {
  try {
    dispatch({
      type: USER.UPDATE_USER,
      payload: user,
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = index => async dispatch => {
  try {
    dispatch({
      type: USER.DELETE_USER,
      payload: index,
    })
  } catch (error) {
    console.log(error)
  }
}

export {
  createUser,
  createRandomUser,
  updateUser,
  deleteUser,
}