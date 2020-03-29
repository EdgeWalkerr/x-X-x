#include <iostream>
using namespace std;
int main(){
	int** intQueue = new int*[2];
	int* a;
	int b = 10;
	a = &b;
	cout << (* a);
	intQueue[0] = a;
	string t = "asdfaf";
	char c = '6';
	cout << t + c;
	return 0;
}