import React, { useCallback, useMemo, useState } from 'react';
import Chart from './components/chart';
import { useMachine } from '@xstate/react';
import { toggleMachine, timeList } from '@/state';
import { Div, Emotion } from '@/components/block';

export default function Root() {
  const [state, send] = useMachine(toggleMachine);
  const [startType, setStartType] = useState<'emotion10' | 'emotion11'>(
    'emotion10'
  );
  const [chartVisibility, setChartVisibility] = useState(false);
  const [finished, setFinished] = useState(true);
  const { timeIndex, stateIndex } = state.context;
  const callback = useCallback(
    (time) => {
      if (timeIndex * 10 + stateIndex >= 31) {
        console.log('stoped!');
        send('STOP', { startType, time });
        setFinished(true);
      } else {
        console.log('time', time);
        send('TOGGLE', { time });
      }
    },
    [timeIndex, stateIndex, startType]
  );

  const emotion10Start = useCallback(() => {
    setFinished(false);
    setStartType('emotion10');
    send('START');
  }, []);

  const emotion11Start = useCallback(() => {
    setFinished(false);
    setStartType('emotion11');
    send('START');
  }, []);

  const combineResult = useCallback(() => {
    setFinished(false);
    setChartVisibility((chartVisibility) => !chartVisibility);
  }, []);

  const Block = useMemo(() => {
    switch (state.value) {
      case 'div':
        return <Div callback={callback} num={timeList[timeIndex]} />;

      case 'emotion':
        return <Emotion callback={callback} num={timeList[timeIndex]} />;

      default:
        return null;
    }
  }, [state.value]);

  return (
    <>
      {Block}
      <div className='absolute'>
        <button
          className='border-red-700 border-solid border-2'
          onClick={emotion10Start}
        >
          div 与 emotion10比较
        </button>
        <button
          className='border-red-700 border-solid border-2'
          onClick={emotion11Start}
        >
          div 与 emotion11比较
        </button>
        <button
          className='border-red-700 border-solid border-2'
          onClick={combineResult}
        >
          合并结果
        </button>
        {chartVisibility && <Chart />}
        {finished && <div>OK</div>}
      </div>
    </>
  );
}
