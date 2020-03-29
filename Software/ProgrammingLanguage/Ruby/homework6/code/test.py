class A
  def m1
    self.m2()
  end
  def m2
    1
  end
end
module M
  def m3
    self.m4()
  end
end
class B < A
  def m2
    1
  end
end