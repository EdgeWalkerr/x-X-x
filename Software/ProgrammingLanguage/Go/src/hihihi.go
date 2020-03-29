package main

func sqrt(x float64) float64 {
	z := 1.0
	for i := 1; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
	}
	return z
}

func main() {
	println(sqrt(2))
}
