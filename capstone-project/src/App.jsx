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
SECURE PASS
</h1>

<p>
A Password Generator and Strength Checker with an Interactive Module for Password Security Practices
</p>

</header>

<PasswordGenerator/>

<PasswordStrengthChecker/>

<InteractiveModule/>

</div>

)

}

export default App