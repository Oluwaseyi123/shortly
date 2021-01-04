console.log(innerWidth)

const boostImage = document.querySelector('.boost-image')
const boostLinksDiv = document.querySelector('.boost-links-div')
if(innerWidth >= "1064"){
    boostImage.src = "images/bg-boost-desktop.svg"
    boostImage.classList.add('.change-boost')
    boostLinksDiv.classList.add('change-boost-link')
    console.log('bla')
}

const submitBtn = document.querySelector('.shorten-btn')

submitBtn.addEventListener('click', shortUrl)

class ShortenUrl{
    async shorten(){
        
        let url = document.querySelector('.long-url').value
        const response = await fetch("https://api.rebrandly.com/v1/links", {
            "method": "POST",
            "headers": {
                //'Authorization':'Bearer {o_pb2re7bu5}',
                'Content-type': 'application/json',
                'apikey': 'cba06eaddacf44f0abeb46e450565972',
                //'workspace': '21f813c022e040629f074e0f76360a4e'
               
            },
            body: 
                JSON.stringify({
                    domain: "{ fullName: 'rebrand.ly'}",
                    destination: `${url}`,
                })
            })
        const responseJSON = await response.json()
        return responseJSON;
    }
}

class LocalStorage{
    addToLocalStorage(){

    }
}

function shortUrl(){
    let copyBtn = document.querySelector('.copy-link')
    //copyBtn.style.display = "none"
    let longUrl = document.querySelector('.long-url').value
    const long = document.querySelector('.long-url')
    const shortenUrl = new ShortenUrl()
    if(longUrl == ''){
        
        showMessage('Please enter a link', 'error-text')
        console.log('put in link')
    }else if(!longUrl.startsWith('http') || !longUrl.startsWith('http') || !longUrl.startsWith('')){
       showMessage('Please put in a proper link', 'error-text')
    }else{
        shortenUrl.shorten().then((res) => {
            //document.querySelector('.long-url').value = res.shortUrl;
            const shortenBtn = document.querySelector('.shorten-btn')
            const longLink = document.querySelector('.long-link')
            const shortLink = document.querySelector('.short-link')
            let linksTable = document.querySelector('.links-table')
            longLink.value = longUrl
            shortLink.value = res.shortUrl
            
            linksTable.style.display = 'flex'
            copyBtn.addEventListener('click', copyText)
            long.value = ''
            console.log(res.shortUrl)
        }).catch((err) => console.log(err))
    }
}


function copyText(){
    let copyBtn = document.querySelector('.copy-link')
    let shortLink = document.querySelector('.short-link')
    shortLink.select()
    shortLink.setSelectionRange(0, 99999999999)

    copyBtn.innerHTML = 'Copied!'

    setTimeout(() => {
        copyBtn.innerHTML = 'Copy Link'
    }, 2000)
    document.execCommand("copy")
    
}

function showMessage(message, className){
    const messageParagraph = document.querySelector('.message')
    let longUrl = document.querySelector('.long-url')
    messageParagraph.textContent = message
    
    messageParagraph.classList.add(className)
    setTimeout(()=> {
        messageParagraph.textContent = ''
    }, 3000)
}