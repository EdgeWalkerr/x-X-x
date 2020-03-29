import sys


def pushConstant(i):
    return ("@" + i + "\n") + "D=A\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


def pushShiftAddress(type, i):
    return ("@" + i + "\n") + "D=A\n" + ("@" + type + "\n") + "A=M\n" + "A=D+A\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


def popShiftAddress(type, i):
    return "@SP\n" + "M=M-1\n" + ("@" + i + "\n") + "D=A\n" + ("@" + type + "\n") + "A=M\n" + "D=D+A\n" + "@R13\n" + "M=D\n" + "@SP\n" + "A=M\n" + "D=M\n" + "@R13\n" + "A=M\n" + "M=D\n"


def pushTempAddress(i):
    return ("@" + i + "\n") + "D=A\n" + "@5\n" + "A=D+A\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


def popTempAddress(i):
    return "@SP\n" + "M=M-1\n" + ("@" + i + "\n") + "D=A\n" + "@5\n" + "D=D+A\n" + "@R13\n" + "M=D\n" + "@SP\n" + "A=M\n" + "D=M\n" + "@R13\n" + "A=M\n" + "M=D\n"


def pushStatic(i):
    return ("@FOO." + i + "\n") + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


def popStatic(i):
    return "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + "D=M\n" + ("@FOO." + i + "\n") + "M=D\n"


def pushPointer(type):
    return ("@" + type + "\n") + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


def popPointer(type):
    return "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + "D=M\n" + ("@" + type + "\n") + "M=D\n"


def arithmetic(type):
    return "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + "D=M\n" + "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + ("M=" + {"add": "D+M", "sub": "M-D", "and": "D&M", "or": "D|M"}[type] + "\n") + "@SP\n" + "M=M+1\n"


def neg(type):
    return "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + ("M=" + {"neg": "-", "not": "!"}[type] + "M\n") + "@SP\n" + "M=M+1\n"


def compare(type, startPoint):
    return "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + "D=M\n" + "@SP\n" + "M=M-1\n" + "@SP\n" + "A=M\n" + "A=M\n" + "D=A-D\n" + ("@LABEL" + str(startPoint) + "\n") + ("D;" + {"eq": "JEQ", "gt": "JGT", "lt": "JLT"}[type] + "\n") + "@SP\n" + "A=M\n" + "M=0\n" + ("@LABEL" + str(startPoint + 1) + "\n") + "0;JMP\n" + "(LABEL" + str(startPoint) + ")\n" + "@SP\n" + "A=M\n" + "M=-1\n" + "(LABEL" + str(startPoint + 1) + ")\n" + "@SP\n" + "M=M+1\n"


def main(fileName):
    f = open(fileName)
    writeFile = open(fileName.split(".")[0] + ".asm", "w+")
    startPoint = 1
    for line in f.readlines():
        line = line.split("//")[0].strip()  # 去掉每行头尾空白
        if not len(line):
            continue

        if "push constant" in line:
            writeFile.write(pushConstant(line.split(" ")[-1]))

        elif "push local" in line or "push argument" in line or "push this" in line or "push that" in line:
            type = {"local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT"}[line.split(" ")[1]]
            i = line.split(" ")[2]
            writeFile.write(pushShiftAddress(type, i))

        elif "pop local" in line or "pop argument" in line or "pop this" in line or "pop that" in line:
            type = {"local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT"}[line.split(" ")[1]]
            i = line.split(" ")[-1]
            writeFile.write(popShiftAddress(type, i))

        elif "push temp" in line:
            writeFile.write(pushTempAddress(line.split(" ")[-1]))

        elif "pop temp" in line:
            writeFile.write(popTempAddress(line.split(" ")[-1]))

        elif "push static" in line:
            writeFile.write(pushStatic(line.split(" ")[-1]))

        elif "pop static" in line:
            writeFile.write(popStatic(line.split(" ")[-1]))

        elif "push pointer" in line:
            writeFile.write(pushPointer(
                ["THIS", "THAT"][int(line.split(" ")[-1])]))

        elif "pop pointer" in line:
            writeFile.write(popPointer(
                ["THIS", "THAT"][int(line.split(" ")[-1])]))

        elif line in ["add", "sub", "and", "or"]:
            writeFile.write(arithmetic(line))

        elif line in ["neg", "not"]:
            writeFile.write(neg(line))

        elif line in ["eq", "gt", "lt"]:
            writeFile.write(compare(line, startPoint))
            startPoint += 2

        else:
            writeFile.write("")


if __name__ == "__main__":
    main(sys.argv[1])
