import { History } from 'history';
import React from 'react';

export type HistoryContextValues = {
  history: History | null;
};

export const HistoryContext = React.createContext<HistoryContextValues>({
  history: null,
});
