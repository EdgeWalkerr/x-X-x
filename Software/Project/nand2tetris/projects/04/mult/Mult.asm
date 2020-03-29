// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.


@R0
D = A

@R2
M = D // 将R2中值置为0

@R0
D = M 

@temp
M = D // temp中放入R0中的值， 不破坏R0

(LOOP)

@temp
D = M

@END
D;JEQ

@temp
D = M

@GreaterThan0
D;JGT

@R2
D = M

@R1
D = D - M

@R2
M = D

@temp
M = M + 1

@LOOP
0;JMP

(GreaterThan0)
@R2
D = M

@R1
D = D + M

@R2
M = D

@temp
M = M - 1

@LOOP
0;JMP

(END)
@END
0;JMP

