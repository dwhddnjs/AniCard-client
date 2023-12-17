"use client";

import React from "react";
import { GoogleOAuthProvider as Provider } from "@react-oauth/google";

export function GoogleOAuthProvider({ children }: any) {
  return (
    <Provider clientId="603883019539-6blk39pt0p7p4tp2dagdqm9vlsv8e7pv.apps.googleusercontent.com">
      {children}
    </Provider>
  );
}
