import { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

export interface Settings {
  username: string,
  goalAmount?: number,
  goalDescription?: string
}

export interface SettingsContextValue {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
  settingsQueryParam: string
}

const SettingsContext = createContext<SettingsContextValue>({} as SettingsContextValue);

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsProvider: FC = ({children}) => {
  const [settings, setSettings] = useState<Settings>({username: ''})

  const queryParams = useRouter().query;
  useEffect(() => {
    const newSettings = deserializeSettings(queryParams);
    setSettings(newSettings);
  }, [queryParams])

  const settingsQueryParam = serializeSettings(settings);

  return (
    <SettingsContext.Provider value={{settings, setSettings, settingsQueryParam}}>
      {children}
    </SettingsContext.Provider>
  );
};


const serializeSettings = (settings: Settings) =>
  `username=${settings.username}`
  + (!!settings.goalAmount ? `&goalAmount=${settings.goalAmount}` : '')
  + (!!settings.goalDescription ? `&goalDescription=${settings.goalDescription}` : '');

const deserializeSettings = (queryParams: ParsedUrlQuery): Settings => {
  return {
    username: queryParams['username'] as string,
    goalAmount: queryParams['goalAmount'] ? +queryParams['goalAmount'] : undefined,
    goalDescription: queryParams['goalDescription'] as string ?? undefined,
  };
}
