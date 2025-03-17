import './App.css'
import Header from './components/Header'
import Interface from './components/Interface'
import Footer from './components/Footer'
import { Box } from '@mui/material'

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box sx={{ flex: 1 }}>
        <Interface />
      </Box>
      <Footer />
    </Box>
  )
}

export default App
