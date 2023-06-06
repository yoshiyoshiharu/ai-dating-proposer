import { createContext, Dispatch, SetStateAction } from 'react'
import { Spot } from '../entity/spot'

interface ContextProps {
  spots: Spot[];
  setSpots: Dispatch<SetStateAction<Spot[]>>;
}

export const SpotContext = createContext<ContextProps>({
  spots: [],
  setSpots: () => { },
});
