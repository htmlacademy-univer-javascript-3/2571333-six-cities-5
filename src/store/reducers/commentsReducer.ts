import {createReducer} from '@reduxjs/toolkit';
import { ReviewProps } from '../../components/Review/Review';
import { LoadingStatus } from '../../recources/LoadingStatus';
import { clearComments, setComments, setLoadingOfferComments } from '../actions';

export type CommentsState = {
  comments: ReviewProps[];
  isCommentsDataLoading: LoadingStatus;
};

const initialState: CommentsState = {
  comments: [],
  isCommentsDataLoading: LoadingStatus.Init,
};

const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(clearComments, (state) => {
      state.comments = [];
      state.isCommentsDataLoading = LoadingStatus.Init;
    })
    .addCase(setLoadingOfferComments, (state, action) => {
      state.isCommentsDataLoading = action.payload;
    });
});

export {commentsReducer};
