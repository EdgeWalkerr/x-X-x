/*
给定一个包含 n 个整数的数组 nums 和一个目标值 target 判断 nums 中是否存在n个元素 使得 和 与 target 相等？找出所有满足条件且不重复的n元组。
链接：https://leetcode-cn.com/problems/4sum
*/

const NSum = (nums: number[], n: number, target: number) => {
    if (nums.length < n || n <= 0) {
        throw new Error('n is not qualified');
    }
    if (n === 1) {
        const result = [];
        for (const index in nums) {
            if (nums[index] === target) {
                result.push(index);
            }
        }
        return result;
    }
    const result = [];
    const newArr = [...nums]; // 不改变参数
    newArr.sort();
    let head = n - 2;
    let tail = nums.length - 1;
    const stack = [];
    for (let i = 0; i < n - 2; i++) {
        stack.push(i);
    }
    while (stack.length > 0) {
        const baseIndex = stack.pop();
        // 实现一个基本的双指针找和  
        // 使用递归， 如果2个在所在情况下能找到合适值， 如果不行（贴合）则将所有值归位，即第
    }

    // 如果是1个， 直接遍历
    //用一个栈来存储还未被使用的
}
