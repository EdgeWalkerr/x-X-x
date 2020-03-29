class A
	attr_accessor :x, :z, :y
	def initialize(x, y, z)
		@x = x
		@y = y
		@z = z
	end
	def add (a, b)
		@x = a.x + b.x
		puts x
	end
	def m 
		42
	end
end 
class B < A
	def initialize(x,y,z)
		super
		@x = 10
	end
	def m 
		x + y + z
	end
end

a = A.new(4,5,9)
b = A.new(0,5,9)
c = B.new(4,5,9)
puts c.m