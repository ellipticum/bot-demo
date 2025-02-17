import Wrapper from './components/Wrapper'
import DataProvider from './providers/DataProvider.tsx'

const App = () => {
    return (
        <DataProvider>
            <Wrapper />
        </DataProvider>
    )
}

export default App
