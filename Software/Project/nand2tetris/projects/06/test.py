# -*- coding: UTF-8 -*-

# 首先进行一次正常扫描， 去除注释和空行 ✅
# 提取变量 如果 @后面不是数字， 就是变量
# 提取并删除锚点 带括号的就是锚点
# 然后将变量和锚点生成一个object 变量或者锚点值：数字

# 再次进行扫描， 正常的

f = open("projects/06/asdf/Rect.asm")
writeFile = open("projects/06/asdf/Rect.hack", "w+")
reservedVariableDict = {'R0': 0, 'R1': 1, 'R2': 2, 'R3': 3, 'R4': 4, 'R5': 5, 'R6': 6, 'R7': 7, 'R8': 8,
                        'R9': 9, 'R10': 10, 'R11': 11, 'R12': 12, 'R13': 13, 'R14': 14, 'R15': 15, 'SCREEN': 16384, 'KBD': 24576,
                        "SP": 0, "LCL": 1, "ARG": 2, "THIS": 3, "THAT": 4}
variableList = []
anchorDict = {}
lineList = []
comp = {"0": "0101010", "1": "0111111", "-1": "0111010", "D": "0001100", "A": "0110000", "!D": "0001101", "!A": "0110001", "-D": "0001111", "-A": "0110011", "D+1": "0011111", "A+1": "0110111", "D-1": "0001110", "A-1": "0110010", "D+A": "0000010",
        "D-A": "0010011", "A-D": "0000111", "D&A": "0000000", "D|A": "0010101", "M": "1110000", "!M": "1110001", "-M": "1110011", "M+1": "1110111", "M-1": "1110010", "D+M": "1000010", "D-M": "1010011", "M-D": "1000111", "D&M": "1000000", "D|M": "1010101"}
dest = {
    "M": "001",
    "D": "010",
    "MD": "011",
    "A": "100",
    "AM": "101",
    "AD": "110",
    "AMD": "111",
}

jump = {
    "JGT": "001",
    "JEQ": "010",
    "JGE": "011",
    "JLT": "100",
    "JNE": "101",
    "JLE": "110",
    "JMP": "111",
}

for line in f.readlines():
    line = line.split("//")[0].strip()  # 去掉每行头尾空白
    if not len(line):
        continue
    # 查看是否为变量， 如果为变量
    # 查看是否为锚点， 如果是， 则看lineList有多少行， 来确定对应的

    if line.startswith("("):
        mPosition = line.replace("(", "").replace(")", "")
        if mPosition in variableList:
            variableList.remove(mPosition)
        anchorDict[mPosition] = len(lineList)
        continue

    elif line.startswith("@"):
        mPosition = line.split("@")[1]
        if not mPosition.isdigit() and mPosition not in reservedVariableDict and mPosition not in anchorDict and mPosition not in variableList:
            variableList.append(mPosition)

    lineList.append(line)

for key, value in anchorDict.items():
    reservedVariableDict[key] = value

for index, value in enumerate(variableList):
    reservedVariableDict[value] = index + 16


def str216Binary(string):
    binary = bin(int(string))[2:]
    return "0" * (16 - len(binary)) + str(binary)


def dealAInstruction(string):
    if (str(string).isdigit()):
        return str216Binary(string)

    else:
        return str216Binary(reservedVariableDict[string])


def dealCInstruction(string):
    result = ""
    stringList = str(string).split(";")
    jumpStr = stringList[-1] if len(stringList) > 1 else ""
    prevStr = str(string).split(";")[0].strip().split("=")
    destStr = prevStr[0] if len(prevStr) > 1 else ""
    compStr = prevStr[1] if len(prevStr) > 1 else prevStr[0]

    if len(jumpStr):
        result = jump[jumpStr] + result

    else:
        result = "000" + result

    if len(destStr):
        result = dest[destStr] + result

    else:
        result = "000" + result

    return "111" + comp[compStr] + result


def dealLine(string):
    if str(string).startswith("@"):

        return dealAInstruction(str(string)[1:])

    else:
        return dealCInstruction(string)


lineList = list(map(dealLine, lineList))

for line in lineList:
    writeFile.write(line + "\n")

writeFile.close()
f.close()
