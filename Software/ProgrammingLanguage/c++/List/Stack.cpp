#include <iostream>
#include "linkedListTrue.cpp"
using namespace std;
class Stack: public List{
	public:
		void push(const int d){
			return insert(d);
		}

		int pop(){
			Node* p = get_head();
			Node* q = p -> next;
			p -> next = q -> next;
			int num = q -> data;
			delete q;
			return num;
		}

		Node* get_head(){
			return head;
		}
};


int main(int argc, const char * argv[])
{

    // insert code here...
    Stack* s = new Stack();
    s -> push(2);
    s -> push(3);
    s -> push(4);
    cout << s -> pop() << endl;
    cout << s -> pop() << endl;
    cout << s -> pop() << endl;
    return 0;
}