// Given
var endorsements = [
  { "skill": 'javascript', "user": 'Chad' },
  { "skill": 'javascript', "user": 'Bill' },
  { "skill": 'css', "user": 'Sue' },
  { "skill": 'javascript', "user": 'Sue' },
  { "skill": 'css', "user": 'Bill' },
  { "skill": 'html', "user": 'Sue' }
];

// Result
// [
//   { 'skill': 'javascript', "user": [ 'Chad', 'Bill', 'Sue' ], "count": 3, },
//   { 'skill': 'css', "user": [ 'Sue', 'Bill' ], "count": 2, },
//   { 'skill': 'html', "user": [ 'Sue' ], "count": 1 }
// ];

var i, hash = {}, result = [], skill, user, temp;

for(i = 0; i < endorsements.length; i++) {
  skill = endorsements[i].skill;
  user  = endorsements[i].user;
  if(skill in hash) {
    hash[skill].push(user);
  } else {
    hash[skill] = [user];
  }
}

for(i in hash){
  temp = {};
  temp.skill = i;
  temp.user = hash[i];
  temp.count = temp.user.length;
  result.push(temp);
}

