import LoginPage from "./components/Login"
import Profile from "./components/Profile"
import { AuthProvider } from "./context/authContext"

function App() {

  return (
    <>
      <AuthProvider>
        <LoginPage />
        <Profile />
      </AuthProvider>
    </>
  )
}

export default App
