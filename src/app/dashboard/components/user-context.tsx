'use client';

import { createContext, useContext, ReactNode } from 'react';

type UserProfile = {
  full_name?: string | null;
  role?: string | null;
};

type UserData = {
  id: string;
  email: string;
};

type UserDomainData = {
  domain: string;
  secondary_domain?: string | null;
  skills?: string[];
  [key: string]: any;
};

type UserContextType = {
  user: UserData | null;
  profile: UserProfile | null;
  userDomain: UserDomainData | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
  user,
  profile,
  userDomain,
}: {
  children: ReactNode;
  user: UserData | null;
  profile: UserProfile | null;
  userDomain: UserDomainData | null;
}) {
  return (
    <UserContext.Provider value={{ user, profile, userDomain }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
