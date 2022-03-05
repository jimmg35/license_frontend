import React, { createContext, useState } from 'react'

export type realTimeMonitorDrawerContextType = {
  realTimeMonitorTitle: string,
  realTimeMonitorSettitle: React.Dispatch<React.SetStateAction<string>>,
  realTimeMonitorContent: React.ReactNode,
  realTimeMonitorSetcontent: React.Dispatch<React.SetStateAction<React.ReactNode>>
  realTimeMonitorHide: boolean,
  realTimeMonitorSethide: React.Dispatch<React.SetStateAction<boolean>>
}

export type historyQueryDrawerContextType = {
  historyQueryTitle: string,
  historyQuerySettitle: React.Dispatch<React.SetStateAction<string>>,
  historyQueryContent: React.ReactNode,
  historyQuerySetcontent: React.Dispatch<React.SetStateAction<React.ReactNode>>
  historyQueryHide: boolean,
  historyQuerySethide: React.Dispatch<React.SetStateAction<boolean>>
}

export type routeAnalysisDrawerContextType = {
  routeAnalysisTitle: string,
  routeAnalysisSettitle: React.Dispatch<React.SetStateAction<string>>,
  routeAnalysisContent: React.ReactNode,
  routeAnalysisSetcontent: React.Dispatch<React.SetStateAction<React.ReactNode>>
  routeAnalysisHide: boolean,
  routeAnalysisSethide: React.Dispatch<React.SetStateAction<boolean>>
}
// export const drawerContext = createContext<DrawerContextType>({
//   title: undefined, settitle: undefined, content: undefined, setcontent: undefined, hide: false, sethide: undefined
// })

export const realTimeMonitorDrawerContext = createContext({} as realTimeMonitorDrawerContextType)
export const historyQueryDrawerContext = createContext({} as historyQueryDrawerContextType)
export const routeAnalysisDrawerContext = createContext({} as routeAnalysisDrawerContextType)

export interface IDrawerProviderProps {
  children: React.ReactNode
}

const emptyComponent = () => (<div>empty</div>)

export const RealTimeMonitorDrawerProvider = ({ children }: IDrawerProviderProps) => {
  const [realTimeMonitorTitle, realTimeMonitorSettitle] = useState<string>('untitled')
  const [realTimeMonitorHide, realTimeMonitorSethide] = useState<boolean>(true)
  const [realTimeMonitorContent, realTimeMonitorSetcontent] = useState<React.ReactNode>(emptyComponent)
  return (
    <realTimeMonitorDrawerContext.Provider value={{
      realTimeMonitorTitle,
      realTimeMonitorSettitle,
      realTimeMonitorContent,
      realTimeMonitorSetcontent,
      realTimeMonitorHide,
      realTimeMonitorSethide
    }}>
      {children}
    </realTimeMonitorDrawerContext.Provider>
  )
}

export const HistoryQueryDrawerProvider = ({ children }: IDrawerProviderProps) => {
  const [historyQueryTitle, historyQuerySettitle] = useState<string>('untitled')
  const [historyQueryHide, historyQuerySethide] = useState<boolean>(true)
  const [historyQueryContent, historyQuerySetcontent] = useState<React.ReactNode>(emptyComponent)
  return (
    <historyQueryDrawerContext.Provider value={{
      historyQueryTitle,
      historyQuerySettitle,
      historyQueryContent,
      historyQuerySetcontent,
      historyQueryHide,
      historyQuerySethide
    }}>
      {children}
    </historyQueryDrawerContext.Provider>
  )
}

export const RouteAnalysisDrawerProvider = ({ children }: IDrawerProviderProps) => {
  const [routeAnalysisTitle, routeAnalysisSettitle] = useState<string>('untitled')
  const [routeAnalysisHide, routeAnalysisSethide] = useState<boolean>(true)
  const [routeAnalysisContent, routeAnalysisSetcontent] = useState<React.ReactNode>(emptyComponent)
  return (
    <routeAnalysisDrawerContext.Provider value={{
      routeAnalysisTitle,
      routeAnalysisSettitle,
      routeAnalysisContent,
      routeAnalysisSetcontent,
      routeAnalysisHide,
      routeAnalysisSethide
    }}>
      {children}
    </routeAnalysisDrawerContext.Provider>
  )
}
