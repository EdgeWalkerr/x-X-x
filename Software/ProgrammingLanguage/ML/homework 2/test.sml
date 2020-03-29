val aList = [1,2,3,4,3,2,5,3,2,4,2]
fun those(aList : int list) = 	
	case aList of
		[] => 0
		|head :: tail => 	if head = 3
							then 1 + those(tail)
							else those(tail)

fun aaa(aList : int list) = 
	let 
		val a = 5
	in
		a
	end
val thss = aaa([])
