# 二分查找

又称为折半查找，是一种效率较高的查找方法。

要求

- 必须采用顺序存储结构
- 有序排列

时间复杂度 O(log<sub>2</sub>n)

思想：
首先，假设表中元素是按升序排列，将表中间位置记录的关键字与查找关键字比较，如果两者相等，则查找成功；否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于查找关键字，则进一步查找前一子表，否则进一步查找后一子表。重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止，此时查找不成功。

代码：

```JavaScript
function bs(nums,n){
    var min=0;
    var max=nums.length-1;
    while(min<=max){
        var mid = min + (max-min>>1); // 减法防止溢出，括号因为移位优先级低
        if(nums[mid]>n){
            max=mid-1;
        }else if(nums[mid]<n){
            min=mid+1;
        }else return mid;
    }
    return -1;
}
```
