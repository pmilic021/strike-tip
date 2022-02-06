import { useMemo } from 'react';

type Props = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  settings?: {
    hideWhenZero: {
      days?: boolean;
      hours?: boolean;
      minutes?: boolean;
      seconds?: boolean;
    };
  };
};

const Digit = ({ value }: { value: number }) => {
  return (
    <>
      {value < 10 ? '0' : ''}
      {value}
    </>
  );
};

const defaultSettings = {
  hideWhenZero: {
    days: true,
    hours: true,
    minutes: false,
    seconds: false,
  },
};

export const Timer = ({ days, hours, minutes, seconds, settings }: Props) => {
  const finalSettings = useMemo(
    () => ({
      hideWhenZero: {
        ...defaultSettings.hideWhenZero,
        ...settings?.hideWhenZero,
      },
    }),
    [settings]
  );

  const hideWhenZero = finalSettings.hideWhenZero;

  return (
    <span>
      {days > 0 || !hideWhenZero.days ? (
        <>
          <Digit value={days} />:
        </>
      ) : null}
      {hours > 0 || !hideWhenZero.hours ? (
        <>
          <Digit value={hours} />:
        </>
      ) : null}
      {minutes > 0 || !hideWhenZero.minutes ? (
        <>
          <Digit value={minutes} />:
        </>
      ) : null}
      {seconds > 0 || !hideWhenZero.seconds ? <Digit value={seconds} /> : null}
    </span>
  );
};
