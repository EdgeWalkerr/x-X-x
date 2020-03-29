s1 = [ "colors", "red", "blue", "green" ]
s2 = [ "letters", "a", "b", "c" ]
s3 = "foo"
a  = [ s1, s2, s3 ]
puts a.assoc("letters")  #=> [ "letters", "a", "b", "c" ]
puts a.assoc("foo")      #=> nil