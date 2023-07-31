
import './index.css'
import {Provider} from "react-redux"
import {store} from './store/configStore'
import App from "./App"
import {createRoot} from "react-dom/client"

const container = document.getElementById('root')
if (container !== null) {
    const root = createRoot(container)
    root.render(
        <Provider store={store}>
            <App />
        </Provider>,
    )
} else {
    console.error("No root element found")
}
