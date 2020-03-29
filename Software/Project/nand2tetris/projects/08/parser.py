# this file translate vm file to more simple vm file
# accept a list of command and return a list of command
# del with function
# return
# call


def parser(arr):
    result = []
    returnNum = 0
    for line in arr:
        commandList = line.split(" ")
        if commandList[0] == "function":
            result.append("label " + commandList[1])
            result.extend(["push constant 0"] * int(commandList[2]))

        elif commandList[0] == "call":
            result.extend(["push address" + commandList[1] + ".returnAddress", "push address LCL", "push address ARG", "push address THIS", "push address THAT", "push address SP",
                           "push constant 5", "push constant " + commandList[2], "add", "sub", "pop address ARG", "push address SP", "pop address LCL", "goto " + commandList[1]])

        elif commandList[0] == "return":
            result.extend(["push address LCL", "pop address endFrame" + str(returnNum), "push address endFrame" + str(returnNum), "push constant 5", "sub", "push value value SP", "pop address retAddr" + str(returnNum), "pop temp 0", "pop value ARG", "push address ARG", "push constant 1", "add", "pop address SP",
                           "push address endFrame" +
                           str(returnNum), "push constant 1", "sub", "push value value SP", "pop address THAT", "pop temp 0",
                           "push address endFrame" +
                           str(returnNum), "push constant 2", "sub", "push value value SP", "pop address THIS", "pop temp 0",
                           "push address endFrame" +
                           str(returnNum), "push constant 3", "sub", "push value value SP", "pop address ARG", "pop temp 0",
                           "push address endFrame" +
                           str(returnNum), "push constant 4", "sub", "push value value SP", "pop address LCL", "pop temp 0",
                           "goto retAddr" + str(returnNum)])

            returnNum += 1

        else:
            result.append(line)

    return result
