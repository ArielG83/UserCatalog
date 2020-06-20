const matchScore = (userA, UserB) => {
    const stringScore = matchStrings(userA.fullName, UserB.fullName)
    const ageScroe = Math.abs(userA.age - userB.age)

    const finalScore =  stringScore/(ageScroe/10)
    return finalScore
}

const matchStrings = (stringA, stringB) => {
    const total = 0
    const countA = letterCounter(stringA)

    const countObj = stringB.reduce((acc, cur)=>{
        if(acc[cur]){
            acc[cur]++
        }else if(countA[cur]){
            acc[cur] = countA[cur] + 1
        }
    }, {})

    for (const occurrences in countObj) {
        total = total + occurrences
    }

    return total
}

const letterCounter = string => {
    return string.reduce((acc, cur)=>{
        if(cur.match(/[a-zA-Z]+/g)){
            acc[cur] = acc[cur]++ || 1
        }
    }, {})
}

