import PasswordGenerator from "./pages/PasswordGenerator"
import PasswordStrengthChecker from "./pages/PasswordStrengthChecker"
import InteractiveModule from "./components/InteractiveModule"
import "./styles/App.css"

import "./styles/App.css"

function App(){

return(

<div className="app">

<header>

<h1>
HAERIN
</h1>

<p>
Secure Password Analysis Platform
</p>

</header>

<PasswordGenerator/>

<PasswordStrengthChecker/>

<InteractiveModule/>

</div>

)

}

export default App