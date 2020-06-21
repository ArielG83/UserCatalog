import { isEmpty } from './general'
export const matchScore = (userA, userB) => {
    const stringScore = matchStrings(userA.fullName, userB.fullName)
    const ageScroe = Math.abs(userA.age - userB.age)

    const totalScore = ageScroe > 0 ? stringScore/(ageScroe/10) : 0
    return Math.floor(totalScore)
}

const matchStrings = (stringA, stringB) => {
    let total = 0
    const countA = letterCounter(stringA)
    if(isEmpty(countA)){
        return total
    }

    const countObj = stringB.split('').reduce((acc, cur)=>{
        if(acc[cur]){
            acc[cur] + 1
        }else if(countA[cur]){
            acc[cur] = countA[cur] + 1
        }

        return acc
    }, {})

    for (let value of Object.values(countObj)) {
        total += value
    }

    return total
}

const letterCounter = string => {
    return string.split('').reduce((acc, cur)=>{
        if(cur.match(/[a-zA-Z]+/g)){
            acc[cur] = typeof acc[cur] !== 'undefined' ?  acc[cur] + 1 : 1
        }

        return acc
    }, {})
}

