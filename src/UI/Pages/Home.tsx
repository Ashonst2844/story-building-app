import Button from "../Components/Button";
import Image from "../Components/Image";

function Home() {
    return(
        <div id="home" className="full-page pages center" style={{flexDirection:"column"}}>
            <h1 style={{fontFamily:"BlackLetters", color:"var(--accent)",fontSize:"3rem"}}>THE SINS SAGA</h1>
            <p style={{fontStyle:"italic", textAlign:"center"}}>"Tujuh dosa, Tujuh manusia, dan tujuh kisah tragis dalam dunia fantasi <br /> yang dibungkus dengan kelam nya moralitas manusia."</p>
            <p style={{margin:"calc(var(--spacing)*2) 0", color:"var(--accent)", fontWeight:"600"}}>- Masagus Ahmad Ramadhan -</p>
            <div className="center" style={{
                width:"100%",
                gap:"var(--spacing)"
            }}>
                <Button style={{color:"black"}} type="link" theme="primary" w="40%" url="https://www.wattpad.com/user/MasagusAhmadRamadhan">Check My Wattpad!</Button>
                <Button type="link" theme="secondary" w="60px" url="https://www.instagram.com/msgs_adra?igsh=anJraGtoZDBvM2V1">
                    <Image type="icon" name="instagram" style={{
                        width:"50%"
                    }}/>
                </Button>
            </div>
        </div>
    )
}
export default Home;