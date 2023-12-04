import { createContext } from 'react';

interface EventContextInterface {
  name: string;
  params?: object;
}
//Event tracking context
export const ScreenContext = createContext<EventContextInterface | null>(null);
export const SectionContext = createContext<EventContextInterface | null>(null);
export const ControlContext = createContext<EventContextInterface | null>(null);
export const ActionContext = createContext<EventContextInterface | null>(null);
