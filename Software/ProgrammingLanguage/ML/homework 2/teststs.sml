fun f (y) = 
	let 
		val x = y + 1
	in
		fn z => x + y + z
	end
fun sqrt_of_abs (i) = Math.sqrt (Real.fromInt(abs i))
val a = sqrt_of_abs(5)
fun sqrt_of_abs (i) = (Math.sqrt o Real.fromInt o abs) i
val b = sqrt_of_abs(5)
val sqrt_of_abs = Math.sqrt o Real.fromInt o abs
val c = sqrt_of_abs (6)

