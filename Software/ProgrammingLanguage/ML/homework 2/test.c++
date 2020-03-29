def A(n):
    number=2
    count=0;
    while True :
        for i in range(number - 1):
            flag=0
            if number%(i+1)==0:
                flag = 1
                break
        if number==2:
            flag=0
        if flag==0:
            count = count + 1
            if count==n:
                return number
        number = number + 1

print(A(10))
