# Git

Porcelain vs plumbing

blob的组成

![img](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708083924482.png?token=ADGPFSHOVZNPFPW75ZQX7M27CAFLO)



blob缺少信息

- fileName
- Directory structures

用 cat-file来查看blob类型和内容

![image-20200708084133039](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084133039.png?token=ADGPFSHGVVLWAOGIYT7A4727AULJQ)

### tree：

![image-20200708084323863](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084323863.png?token=ADGPFSAFOYXW3EVN3RJ7PGK7AULO2)

![image-20200708084430830](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084430830.png?token=ADGPFSDXTTM2HS5ZVDQIAGS7AULTA)

### commit

![image-20200708084453616](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084453616.png?token=ADGPFSAC7UMTR3CNI6GLZIK7AULUM)

![image-20200708084515969](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084515969.png?token=ADGPFSDLSYFODRAZXZC7GPC7AULVY)

![image-20200708084556537](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084556537.png?token=ADGPFSHUOPEOK4W2NPPORIC7AULYO)



![image-20200708084629487](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084629487.png?token=ADGPFSANBBDNH2OZCB5X75S7AUL2O)

```bash
git add -p //用来选择性的pick需要添加的文件
git add ? show help
```

![image-20200708084652266](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084652266.png?token=ADGPFSFGCSOMWQJGOWYIYKK7AUL3Y)

![image-20200708084713710](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084713710.png?token=ADGPFSAWFBSIA4E2QST5KH27AUL5E)

![image-20200708084800033](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708084800033.png?token=ADGPFSBFCJSTSMWYRWERWXK7AUMAE)

![image-20200708085104571](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708085104571.png?token=ADGPFSB5HHMEMCOONFXUM627AUMLU)

![image-20200708085136787](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708085136787.png?token=ADGPFSHF4MD6CFEUOZEUZ5C7AUMNS)

git stash apply stash@{WIP: making progress on foo}

untracked是啥意思?

> Untracked files are everything else — **<u>any files in your working directory that were not in your last snapshot and are not in your staging area.</u>** When you first clone a repository, all of your files will be tracked and unmodified because Git just checked them out and you haven’t edited anything.

## reference points to commit

- **Branch** points to commit, branch always point to some commit

  ![image-20200708085209688](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708085209688.png?token=ADGPFSC54JY6WG4BPAD2WGS7AUMPU)

- **Head** is how git knows what branch you're currently on.Head can point on branch and commit

  ![image-20200708085242254](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708085242254.png?token=ADGPFSAST4MF2X3USF2PODK7AUMRW)

  如果HEAD在tech_posts上， 则新生成的commit会连在tech_posts上

  

  ![image-20200708085448629](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708085448629.png?token=ADGPFSBNXJ2OIS7XTFUYH5K7AU6MS)

- **TAG**

  

![image-20200708085759501](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708085759501.png?token=ADGPFSCHG4ZUSJJST7SGWX27AU6NO)

![image-20200708112538591](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708112538591.png?token=ADGPFSEGQIICSYAKTMZX5H27AU6PG)

![image-20200708112726046](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708112726046.png?token=ADGPFSB37RO274BK5E4X4NS7AU6V6)

### HEAD-LESS/Detached HEAD

Head point to a commit other than a branch

### Dangling Commit

## Merge and fast forward

![image-20200708112756921](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708112756921.png?token=ADGPFSH754TTY3EM7EUB3Z27AU6X4)

![image-20200708112842547](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708112842547.png?token=ADGPFSHTFXK2KQ3CKSH3RJK7AU622)

### 查找commit

![image-20200708112909836](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708112909836.png?token=ADGPFSCSI4QQLUBEUXABK2K7AU64O)

![image-20200708112932239](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708112932239.png?token=ADGPFSAQHQALXG6IYK7QQD27AU656)

![image-20200708113014865](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113014865.png?token=ADGPFSFRV3KQC2H724RCDDS7AU7AS)

## git diff

Working-area   <-git diff ->  stage <- git diff --staged ->   repository

git add 是将 working-area中差异的部分添加到stage中

commit是将stage中的内容放到repository中

![image-20200708113034818](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113034818.png?token=ADGPFSC4PHE5WE3UHPSANBK7AU7B2)

git diff A B 和 git diff A..B相同， 结果是得出蓝绿色的B

## Fixing mistake

- checkout

  ![image-20200708113121802](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113121802.png?token=ADGPFSBFKMXTER37XN4ZXE27AU7EY)

  

  ![image-20200708113149354](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113149354.png?token=ADGPFSAN5U2ZITKSJYIZJIK7AU7GO)

  将staging area中内容恢复过来

  ```bash
  git checkout -- filename
  git checkout commitId -- filename // 从指定的commit中恢复， 并且覆盖staging area中文件
  ```
	更改某个文件到commitId上的内容 将 对应commit上的内容全部拷贝到 staging area 还有 working area


  如果需要将repo中的内容恢复到stageing area需要使用

  git reset commitId 放到staging area中 

  ![image-20200708113209045](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113209045.png?token=ADGPFSA7J2346F7DWHHKO4S7AU7HY)

```bash
git checkout c5f567 -- file1/to/restore file2/to/restore
```

- Reset

```bash
	git reset --hard
```

![image-20200708113231862](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113231862.png?token=ADGPFSGBNIQMOAQXPXQYMRK7AU7JG)


```bash
	git reset --mixed
```

![image-20200708113247976](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113247976.png?token=ADGPFSBZ5UG3IDX5XTK3H6K7AU7KQ)


```bash
	git reset --soft
```
 可以用来squash commits

![image-20200708113321922](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113321922.png?token=ADGPFSFBP5U6HO5GBVHYOGS7AU7MM)


- revert 将对应commitID内容重新commit一次

```bash
git revert commitID
```

## Rebase, amend -- rewrite history! 

![image-20200708113354002](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113354002.png?token=ADGPFSDVIET2O5GTVQ3B7EC7AU7OQ)

![image-20200708113430086](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113430086.png?token=ADGPFSBPF54EFYP3ZNIFFG27AU7QS)

![image-20200708113455554](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113455554.png?token=ADGPFSCDWK2EEMUDRE6FRGK7AU7SG)

![image-20200708113524227](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113524227.png?token=ADGPFSAAZUHHQB5KH5B62LK7AU7UA)

![image-20200708113556117](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113556117.png?token=ADGPFSATJKMETJG3ZFZJQ3K7AU7WA)

![image-20200708113627616](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113627616.png?token=ADGPFSAHOKD4OU4QEW4NDWS7AU7YC)

![image-20200708113817571](https://raw.githubusercontent.com/EdgeWalkerr/images/master/image-20200708113817571.png?token=ADGPFSDRWSEFBNOM7HFLJR27AU764)

最终被fix的commit连同之后的commit也都被修改了

![img](https://raw.githubusercontent.com/EdgeWalkerr/images/master/paste-c88d97df86466cbb69f5f9404f0cecfd333d3295.jpg?token=ADGPFSGLLEZXIFR7KLPX3OC7AVOV2)

https://stackoverflow.com/questions/2389361/undo-a-git-merge-that-hasnt-been-pushed-yet

git reflog查看最近的工作， 可以用来恢复不可见的commit

rebase都是用commit(delta content)replay在之前repo上面的

merge 将总体的delta两个相互合并

revert， 只是把之前的commit给撤销掉， 当撤销的当前的commit, 那就会恢复成这次commit之前的repo

commit fix up 就是在当前commit做一些commit， 然后应用到之前分支上。

将某一个commit split成多个：

https://stackoverflow.com/questions/6217156/break-a-previous-commit-into-multiple-commits



