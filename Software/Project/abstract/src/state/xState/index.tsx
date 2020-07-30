import { Machine, assign, send, AssignMeta } from 'xstate';
import { writeStorage } from '@rehooks/local-storage';

const timeList = [100, 1000, 10000, 100000] as const;
const stateList = ['div', 'emotion'] as const;

interface ToggleContext {
  timeIndex: number;
  stateIndex: number;
  data: Partial<{ [key in typeof stateList[number]]: number }>[];
}
type ToggleEvent =
  | {
      type: 'TOGGLE';
      time: number;
    }
  | {
      type: 'START';
      time: number;
    }
  | {
      type: 'STOP';
      startType: 'emotion10' | 'emotion11';
      time: number;
    };

const nextTick = (
  { timeIndex: passTimeIndex, stateIndex: passStateIndex, data }: ToggleContext,
  event: ToggleEvent
): Partial<ToggleContext> => {
  if ((passStateIndex + 1) % 2 === 0) {
    const timeIndex = passTimeIndex + 1;
    const newData = [
      ...data,
      {
        [stateList[0]]: event.time as number,
      },
    ];
    return {
      timeIndex,
      stateIndex: 0,
      data: newData,
    };
  } else {
    const stateIndex = 1;
    const lastItem = data.pop();
    Object.assign(lastItem, { [stateList[stateIndex]]: event.time as number });
    const newData = [...data, lastItem!];
    return {
      stateIndex,
      timeIndex: passTimeIndex,
      data: newData,
    };
  }
};

const toggleMachine = Machine<
  ToggleContext,
  {
    states: {
      div: {};
      emotion: {};
      stop: {};
    };
  },
  ToggleEvent
>({
  id: 'start',
  initial: 'stop',
  context: {
    timeIndex: -1,
    stateIndex: -1,
    data: [],
  },
  // 每次状态转换时需要记录数据
  states: {
    stop: {
      on: {
        START: {
          target: 'div',
        },
      },
    },
    div: {
      on: {
        TOGGLE: {
          target: 'emotion',
          actions: assign(nextTick),
        },
        STOP: {
          target: 'stop',
          actions: assign((context, { startType }) => {
            console.log('i am here', context);
            console.log(JSON.stringify(context.data.map(({ div }) => div)));
            writeStorage(
              'div',
              context.data.map(({ div }) => div)
            );

            writeStorage(
              startType,
              context.data.map(({ emotion }) => emotion)
            );
            return {
              timeIndex: -1,
              stateIndex: -1,
              data: [],
            };
          }),
        },
      },
    },
    emotion: {
      on: {
        TOGGLE: {
          target: 'div',
          actions: assign(nextTick),
        },
      },
    },
  },
});

export { timeList, toggleMachine, stateList };
