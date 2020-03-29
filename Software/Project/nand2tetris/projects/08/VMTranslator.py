import sys
import parser
import os


def pushConstant(i):
    return ("@" + i + "\n") + "D=A\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"

# type = "LCL" | "ARG" | "THIS" | "THAT"


def pushShiftAddress(type, i):
    return ("@" + i + "\n") + "D=A\n" + ("@" + type + "\n") + "A=M+D\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


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


def label(labelName):
    return "(" + labelName + ")\n"


def goto(labelName):
    return ("@" + labelName + "\n") + "0;JEQ\n"


def ifGoTo(labelName):
    return "@SP\n" + "M=M-1\n" + "A=M\n" + "D=M\n" + ("@" + labelName + "\n") + "D;JNE\n"


def selfCreatedPush(addressOrValue, labelName):
    return ("@" + labelName + "\n") + ("A=M\n" if addressOrValue == "value" else "") + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n"


def returnCommand():
    return "@LCL\n" + "D=M\n" + "@R13\n" + "M=D\n" + "@5\n" + "A=D-A\n" + "D=M\n" + "@R14\n" + "M=D\n" + "@SP\n" + "M=M-1\n" + "@ARG\n" + "D=M\n" + "@R15\n" + "M=D\n" + "@SP\n" + "A=M\n" + "D=M\n" + "@R15\n" + "A=M\n" + "M=D\n" + "@ARG\n" + "D=M+1\n" + "@SP\n" + "M=D\n" + "@R13\n" + "M=M-1\n" + "@R13\n" + "A=M\n" + "D=M\n" + "@THAT\n" + "M=D\n" + "@R13\n" + "M=M-1\n" + "@R13\n" + "A=M\n" + "D=M\n" + "@THIS\n" + "M=D\n" + "@R13\n" + "M=M-1\n" + "@R13\n" + "A=M\n" + "D=M\n" + "@ARG\n" + "M=D\n" + "@R13\n" + "M=M-1\n" + "@R13\n" + "A=M\n" + "D=M\n" + "@LCL\n" + "M=D\n" + "@R14\n" + "A=M\n" + "0;JMP\n"


def callCommand(callPoint, functionName, num):
    return ("@returnAddress" + str(callPoint) + "\n") + "D=A\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n" + "@LCL\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n" + "@ARG\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n" + "@THIS\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n" + "@THAT\n" + "D=M\n" + "@SP\n" + "A=M\n" + "M=D\n" + "@SP\n" + "M=M+1\n" + "@" + str(int(num) + 5) + "\n" + "D=A\n" + "@SP\n" + "D=M-D\n" + "@ARG\n" + "M=D\n" + "@SP\n" + "D=M\n" + "@LCL\n" + "M=D\n" + ("@" + functionName + "\n") + "0;JMP\n" + ("(returnAddress" + str(callPoint) + ")\n")


def readFiles(name):
    f = open(name)
    lineList = []
    for line in f.readlines():
        line = line.split("//")[0].strip()  # 去掉每行头尾空白
        if not len(line):
            continue
        lineList.append(line)
    return lineList


def main(name):
    lineList = []
    result = ""
    startPoint = 1
    callPoint = 1
    if os.path.isfile(name.split(".")[0] + ".vm"):
        lineList = readFiles(name.split(".")[0] + ".vm")

    else:
        result = "@256\n" + "D=A\n" + "@SP\n" + "M=D\n"
        files = os.listdir(name.split(".")[0])
        lineList.append("call Sys.init 0")
        for file in files:
            if ".vm" in file:
                lineList.extend(readFiles(name.split(".")[0] + "/" + file))

    for line in lineList:
        line = line.split("//")[0].strip()  # 去掉每行头尾空白
        if not len(line):
            continue
        if "push constant" in line:
            result += pushConstant(line.split(" ")[-1])

        elif "push local" in line or "push argument" in line or "push this" in line or "push that" in line:
            type = {"local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT"}[line.split(" ")[1]]
            i = line.split(" ")[2]
            result += pushShiftAddress(type, i)

        elif "pop local" in line or "pop argument" in line or "pop this" in line or "pop that" in line:
            type = {"local": "LCL", "argument": "ARG",
                    "this": "THIS", "that": "THAT"}[line.split(" ")[1]]
            i = line.split(" ")[-1]
            result += popShiftAddress(type, i)

        elif "push temp" in line:
            result += pushTempAddress(line.split(" ")[-1])

        elif "pop temp" in line:
            result += popTempAddress(line.split(" ")[-1])

        elif "push static" in line:
            result += pushStatic(line.split(" ")[-1])

        elif "pop static" in line:
            result += popStatic(line.split(" ")[-1])

        elif "push pointer" in line:
            result += pushPointer(
                ["THIS", "THAT"][int(line.split(" ")[-1])])

        elif "pop pointer" in line:
            result += popPointer(
                ["THIS", "THAT"][int(line.split(" ")[-1])])

        elif line in ["add", "sub", "and", "or"]:
            result += arithmetic(line)

        elif line in ["neg", "not"]:
            result += neg(line)

        elif line in ["eq", "gt", "lt"]:
            result += compare(line, startPoint)
            startPoint += 2

        elif "label" in line:
            result += label(line.split(" ")[1])

        elif line.split(" ")[0] == "if-goto":
            result += ifGoTo(line.split(" ")[1])

        elif "goto" in line:
            result += goto(line.split(" ")[1])

        elif line.split(" ")[0] == "function":
            result += "(" + line.split(" ")[1] + ")\n"
            result += pushConstant("0") * int(line.split(" ")[2])

        elif line.split(" ")[0] == "return":
            result += returnCommand()

        elif line.split(" ")[0] == "call":
            result += callCommand(
                callPoint, line.split(" ")[1], line.split(" ")[2])
            callPoint += 1

        else:
            result += ""

    if os.path.isfile(name.split(".")[0] + ".vm"):
        writeFile = open(name.split(".")[0] + ".asm", "w+")
        writeFile.write(result)

    else:
        writeFile = open(name.split(".")[0] + "/" +
                         name.split(".")[0] + ".asm", "w+")
        writeFile.write(result)


if __name__ == "__main__":
    main(sys.argv[1])
