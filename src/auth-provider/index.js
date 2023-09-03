'use client'

import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({ children }) {
    return <SessionProvider>
        {children}
    </SessionProvider>
}
//pass NextAuthProvider in app -> layout.js





//todo import { SessionProvider } from "next-auth/react";:
// This line imports the SessionProvider component from the next - auth / react package.The SessionProvider is a high - order component that provides session information to your Next.js application.
// export default function NextAuthProvider({ children }) { ... }: This line exports a React component called NextAuthProvider as the default export. The component takes a single prop called children, which represents the child components that will be wrapped by this component.
//     return < SessionProvider > { children }</ >: This is the JSX syntax used in React.The NextAuthProvider component returns a JSX expression that wraps the children components with the SessionProvider component.The SessionProvider component is responsible for providing the session information to its descendants.
// The SessionProvider component is used in conjunction with the useSession hook from the next - auth / client package to handle authentication and session management in Next.js applications.The useSession hook allows you to access the session object and check if a user is signed in.