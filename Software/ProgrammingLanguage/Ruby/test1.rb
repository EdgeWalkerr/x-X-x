class A
	def m
		n
	end
	def n
		puts 2
	end
end

class B < A
	def n
		puts 1
	end
end
a = B.new
a.m





