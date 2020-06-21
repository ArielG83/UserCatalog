import { USER } from '../consts'
import { genrateUUID, isEmpty } from '../../utils/general'
import { matchScore } from '../../utils/matching'

const initialState = {
  users: [],
  selectUser: {},
}

const parseUser = (newUser, selectUser) => {
  const { birthDate, fullName, id } = newUser
  return {
    ...newUser,
    id: id ? id : genrateUUID(),
    age: calculateAge(birthDate),
    matchScore: isEmpty(selectUser) ? -1 : matchScore({fullName, age }, selectUser )
  }
}

const parseRandomUser = (originalUser, selectUser) => {
  const {login: {uuid}, name: {first, last}, email, dob: { date, age }, gender, picture: { large }} = originalUser

  return  {
    id: uuid,
    fullName: `${first} ${last}`, 
    email,
    birthDate: new Date(date),
    age,
    gender,
    profileImage: large,
    matchScore: isEmpty(selectUser) ? -1 : matchScore({age, fullName: `${first} ${last}`}, selectUser ), 
  }
}

const calculateAge = dateOfBirth => {
  const ageDate = new Date(Date.now() - dateOfBirth.getTime())
  return Math.abs(ageDate.getFullYear() - 1970)
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USER.CREATE_USER:
        const createdUser = parseUser(payload, state.selectUser)

        return {
          ...state,
          users: [...state.users, createdUser],
        }
    case USER.CREATE_RANDOM_USER:
        const newUser = parseRandomUser(payload[0], state.selectUser)

        return {
          ...state,
          users: [...state.users, newUser],
        }
    case USER.UPDATE_USER:
        const UpdatedUsers = state.users
        UpdatedUsers[payload.userIndex] = parseUser(payload, state.selectUser)

        return {
          ...state,
          users: [...UpdatedUsers],
        }
    case USER.DELETE_USER:
      const newUsers = state.users
      newUsers.splice(payload, 1)

      return {
        ...state,
        users: [...newUsers],
      }
    case USER.SELECT_USER:
        const selectUser = {...state.users[payload], matchScore: -1}
        const reCalculatedUsers = state.users.map( user => {
          const newMatchScore = user.id !== selectUser.id ? matchScore( user, selectUser ) : -1
          return { ...user, matchScore: newMatchScore }
        })

        return {
          ...state,
          users: reCalculatedUsers,
          selectUser: selectUser,
        }
    default:
      return state
  }
}

export default userReducer