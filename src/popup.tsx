import { ThemeProvider } from '@mui/material/styles'

import { Popup } from '~components/templates'
import { theme } from '~theme'

const IndexPopup: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Popup />
  </ThemeProvider>
)

export default IndexPopup
