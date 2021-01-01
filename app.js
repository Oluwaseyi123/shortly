console.log(innerWidth)
const boostImage = document.querySelector('.boost-image')
const boostLinksDiv = document.querySelector('.boost-links-div')
if(innerWidth >= "1064"){
    boostImage.src = "images/bg-boost-desktop.svg"
    boostImage.classList.add('.change-boost')
    boostLinksDiv.classList.add('change-boost-link')
    console.log('bla')
}

//let endpoint = 'https://jsonbox.io/box_12b639ef5bffd67997b2'
const submitBtn = document.querySelector('.shorten-btn')

submitBtn.addEventListener('click', shortUrl)

class ShortenUrl{
    async shorten(link){
        const response = await fetch("https://bitlymikilior1v1.p.rapidapi.com/checkBitlyProDomain", {
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "x-rapidapi-key": "8600504e47mshd622e6fcc528e4ap18cf87jsn2a5ba9232128",
                "x-rapidapi-host": "Bitlymikilior1V1.p.rapidapi.com"
            },
            "body": {
                "accessToken": "undefined",
                "domain": "undefined"
            }
            })
        const responseJSON = await response.json(link)
        return responseJSON;
    }
}


function shortUrl(){
    const longUrl = document.querySelector('.long-url').value
    const shortenUrl = new ShortenUrl()
    if(longUrl == ''){
        console.log('fill it')
    }else{
        
        shortenUrl.shorten().then( (res) => {
        console.log(res)
    } ).catch(err => console.log(err))
    }
    
}
