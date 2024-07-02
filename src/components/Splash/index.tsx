import logo from 'assets/imgs/logo.jpg'

export const Splash = () => {
    return(
        <div className="h-screen bg-main-color">
            <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" src={logo} alt="" />
        </div>
    )
}