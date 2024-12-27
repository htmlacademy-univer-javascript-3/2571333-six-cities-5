import {createAction} from '@reduxjs/toolkit';
import { City } from '../components/Map/Map';
import { CardProps } from '../recources/Types';

export const setCity = createAction<{city: City}>('setCity');
export const setOffers = createAction<{offers: CardProps[]}>('setOffers');
