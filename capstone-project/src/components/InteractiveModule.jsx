import "../styles/InteractiveModule.css"

const features=[

{
category:"Password Generator",

items:[
"crypto.getRandomValues()",
"Fisher-Yates Shuffle",
"Password Length Control",
"Uppercase / Lowercase Toggle",
"Numbers Toggle",
"Symbols Toggle",
"Exclude Ambiguous Characters"
]
},

{
category:"System",

items:[
"Local-Only Processing",
"Browser Session Wipe"
]
},

{
category:"Password Strength Checker",

items:[
"Pattern & Dictionary Checks",
"Password Visibility Toggle",
"Visual Strength Meter",
"Suggestions"
]
}

]

export default function InteractiveModule(){

return(

<section className="module">

<h2>

Interactive Security Module

</h2>

<p>

Implemented Security Features

</p>

{

features.map((group)=>(

<div
key={group.category}
className="category"
>

<h3>

{group.category}

</h3>

<ul>

{
group.items.map(
(item)=>(
<li
key={item}
>

✓ {item}

</li>
)
)
}

</ul>

</div>

))

}

</section>

)

}