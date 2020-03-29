#include <iostream>
using namespace std;
int main()
{	
	int a[]={1,2,3,4};
    int *b=&a[0];
    int *c=a;
    cout<<sizeof(a)<<endl;
    cout << (&a[0]) << endl;
    cout<<sizeof(a+3)<<endl;
    cout<<sizeof(b)<<endl;
    cout<<sizeof(c)<<endl;
	return 0;
}