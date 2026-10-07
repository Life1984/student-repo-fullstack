/** Exercise 02 - Two Sum

Problem:

You are given an array of integers 'nums' and an integer 'target', write a function that returns indices of the two 
numbers such that they add up to target.

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]

**/

function twoSum(nums, target) {
  //Choose the first number in the pair
  for (let i = 0; i < nums.length; i++) {

    //Second number after the first
    for (let j = i + 1; j < nums.length; j++) {

      // Check if values add up to target
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  //Return empty array if empty
  return [];
}

//Run and print each example
const a = twoSum([2, 7, 11, 15], 9); //Example 1
const b = twoSum([3, 2, 4], 6);      //Example 2
const c = twoSum([3, 3], 6);         //Example 3

console.log(a);
console.log(b);
console.log(c);
