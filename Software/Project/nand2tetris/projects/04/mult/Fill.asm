// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

(LOOP)
@SCREEN
D = A

@addr
M = D //放入SCREEN的地址

@8192
D = A

@i
M = D //放入写入黑线的长度

@KBD
D = M

@WHITEBOARD
D;JEQ


(BLACKBOARD)
@i
D = M

@LOOP
D;JEQ

@addr
A = M
M = -1

@i
M = M - 1

@addr
M = M + 1

@BLACKBOARD
0;JMP

(WHITEBOARD)
@i
D = M

@LOOP
D;JEQ

@addr
A = M
M = 0

@i
M = M - 1

@addr
M = M + 1

@WHITEBOARD
0;JMP