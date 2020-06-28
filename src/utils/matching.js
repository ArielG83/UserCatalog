export const matchScore = (userA, userB) => {
  const stringScore = matchStrings(userA.fullName, userB.fullName);
  const ageScroe = Math.abs(userA.age - userB.age);

  const totalScore = ageScroe > 0 ? stringScore / (ageScroe / 10) : 0;
  return Math.floor(totalScore);
};

const matchStrings = (stringA, stringB) => {
  let total = 0;

  const countObj = stringA.split('').reduce((acc, cur) => {
    if (acc[cur]) {
      acc[cur] + 1;
    } else {
      const repeats = (stringB.match(new RegExp(cur, 'g')) || []).length;
      acc[cur] = repeats + 1;
    }

    return acc;
  }, {});

  for (let value of Object.values(countObj)) {
    total += value;
  }

  return total;
};
