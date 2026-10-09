"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "../store";
import { useGetMeQuery } from "../features/auth/authApi";
import { clearUser, setUser } from "../features/auth/authSlice";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  const { data, isSuccess, isError } = useGetMeQuery();

  useEffect(() => {
    console.log(data);
    if (isSuccess && data?.user) {
      dispatch(setUser(data?.user));
    }

    if (isError) {
      dispatch(clearUser());
    }
  }, [data, isSuccess, isError, dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
