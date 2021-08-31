import { Navbar } from "./navbar";

export class NavbarRepository {
    
    private navbar : Navbar[];

    constructor(){
        this.navbar = [
            { id: 1, title : "Home", link : "/"},
            { id: 2, title : "Movies", link : "movies"},
            { id: 3, title : "Create Movies", link : "movies/create"},
            { id: 4, title : "Create Category", link : "categories/create"}
          ]
    }

    getNavbar() : Navbar[]{
        return this.navbar;
    }
    
}