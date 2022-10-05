import { SessionProvider } from 'next-auth/react';

const Layout = ({ children }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <main >
        <SessionProvider session={children.session}>
          {children}
        </SessionProvider>
      </main>
    </div>
  )
}

export default Layout