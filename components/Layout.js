const Layout = ({children}) => {
  return (
    <div className="bg-slate-100 min-h-screen">
        <main >
            {children}
        </main>
    </div>
  )
}

export default Layout