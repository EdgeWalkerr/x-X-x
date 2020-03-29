#include <iostream>
using namespace std;
const int M = 10, N = 5;//10行5列。
int main(){
	int ** a;
	a = new int *[M];
	for(int i = 0; i < M; i ++)
	    a[i] = new int[N];
	cout << a[0] << endl << a[1] <<endl << a[2] << endl;
	cout << a[0][0] << endl << a[0][1] << endl << a[0][2];
	return 0;
}
