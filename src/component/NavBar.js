function NavBar(){
    const NavBar = {
        color: "white",
        backgroundColor: "#721eff",
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }
    
    const Logo = {
        height: "70%",
        marginLeft: "50px",
    }
    
    const LogoText ={
        fontSize: "1.5rem",
        fontWeight: "700"
    }
    return(
        <div style={NavBar}>
            <img style={Logo} src="https://cdn-icons-png.flaticon.com/128/2659/2659360.png" alt="Logo"/>
            <span style={LogoText}>PhotoFolio</span>
        </div>
    )
}

export default NavBar;

// https://cdn-icons-png.flaticon.com/128/2659/2659360.png
// https://cdn-icons-png.flaticon.com/128/7224/7224509.png
// https://cdn-icons-png.flaticon.com/128/833/833281.png
// https://cdn-icons-png.flaticon.com/128/5195/5195875.png