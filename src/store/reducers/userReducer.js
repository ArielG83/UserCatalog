import { USER } from '../consts'
import { genrateUUID } from '../../utils/general'

const initialState = {
  users: []
}

const parseUser = originalUser => {
  const {login: {uuid}, name: {first, last}, email, dob: { date, age }, gender, picture: { large }} = originalUser

  return  {
    id: uuid,
    fullName: `${first} ${last}`, 
    email,
    birthDate: new Date(date),
    age,
    gender,
    profileImage: large,
  }
}

const calculateAge = dateOfBirth => {
  const now = new Date()
  return Math.floor(now.getFullYear() - dateOfBirth.getFullYear())
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action
  

  switch (type) {
    case USER.CREATE_USER:
        const id = genrateUUID()
        const age = calculateAge(payload.birthDate)
        return {
          ...state,
          users: [...state.users, {...payload, id, age}],
        }
    case USER.CREATE_RANDOM_USER:
        const newUser = parseUser(payload[0])
        return {
          ...state,
          users: [...state.users, newUser],
        }
    case USER.UPDATE_USER:
        const UpdatedUsers = state.users
        const updatedAge = calculateAge(payload.birthDate)
        UpdatedUsers[payload.userIndex] = {...payload, age:updatedAge}
        return {
          ...state,
          users: [...UpdatedUsers],
        }
    case USER.DELETE_USER:
      const newUsers = state.users
      newUsers.splice(payload, 1); 
      return {
        ...state,
        users: [...newUsers],
      }
    default:
      return state
  }
}

export default userReducer