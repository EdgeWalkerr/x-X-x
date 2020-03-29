fun fibonacci n =
	let 
		fun fibonacci_helper num xs = 
			if num = n
			then (hd xs) + (hd (tl xs))
			else 
				if num = 1 orelse num = 2
				then fibonacci_helper (num + 1) (1 :: xs)
				else fibonacci_helper (num + 1) ((hd xs) + (hd (tl xs)) :: xs)
	in
		if n = 1 orelse n = 2
		then 1
		else fibonacci_helper 1 []
	end

val a = fibonacci 43
