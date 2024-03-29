// Object Definition
const obj = {
    Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: 'images/background.png',
    },
    Logo: {
        mountX: 0.5,
        mountY: 1,
        x: 960,
        y: 600,
        src: 'images/logo.png',
    },
    Text: {
        mount: 0.5,
        x: 960,
        y: 720,
        text: {
            text: "Let's start Building!",
            fontFace: 'Regular',
            fontSize: 64,
            textColor: 0xbbffffff,
        },
    },
}


/**
 * Function to generate XML tag
 * @param {*} tag 
 * @param {*} props 
 * @param {*} children 
 * @param {*} level 
 * @returns 
 */
function xmlTagGenerator(tag,props,children,level=0){
    let xmlString = `<${tag}`
    if(props && props.length > 0){
        props.forEach(prop => {
            const value  = prop["value"]
            xmlString += ` ${prop["name"]}="${value}" ` // Constructing attribute string
        })
    }
    xmlString += children?.length===0 ? ">" : " >\n"
    
    if(children?.length !== 0){
        for(let i = 0; i< level; i++){
            xmlString += "\t" 
        }
        xmlString += children
        for(let i = 0; i< level-1; i++){
            xmlString += "\t" 
        }
    }
    xmlString += `</${tag}>\n`
    return xmlString
}

/**
 * Function to convert object to XML
 * @param {*} obj 
 * @param {*} root 
 * @param {*} level 
 * @returns 
 */
function convObjToXML(obj,root="Element",level=0){
    if(!obj || typeof(obj) !== "object") return "<></>"
    const keys = Object.keys(obj)
    const props = []
    const children = []
    keys.forEach((key)=>{
        if (typeof(obj[key]) === "object"){ // Checking if value is an object
            const child = convObjToXML(obj[key],key,level+1) // Recursively converting child object to XML
            children.push(child)
        }else{
            props.push({
                name:key,
                value:obj[key]
            })
        }
    })
   return xmlTagGenerator(root,props,children.join(""),level+1)
}

console.log(convObjToXML(obj))
