import Button from "../Components/Button";
import Image from "../Components/Image";

function Home() {
    return <section className="center flex-col gap-8">
        <h1 className="text-6xl text-(--accent) font-[BlackLetters] text-center">THE SINS SAGA</h1>
        <p className="text-center text-(--text) italic">"Tujuh dosa, Tujuh manusia, dan tujuh kisah tragis dalam dunia fantasi yang dibungkus dengan kelam nya moralitas manusia."</p>
        <p className="text-(--accent) font-bold">- Masagus Ahmad Ramadhan -</p>
        <div className="center gap-2 w-full">
            <Button type="link" theme="primary" className="max-w-75 w-full h-full" url="https://www.wattpad.com/user/MasagusAhmadRamadhan">Check My Wattpad!</Button>
            <Button type="link" theme="secondary" w="64px" h="64px" url="https://www.instagram.com/msgs_adra?igsh=anJraGtoZDBvM2V1">
                <Image type="icon" name="instagram" className="scale-50"/>
            </Button>
        </div>
    </section>
}
export default Home;