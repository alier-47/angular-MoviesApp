import { Component, OnInit } from '@angular/core';
import { Navbar } from '../model/navbar';
import { NavbarRepository } from '../model/navbar.repository';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbar : Navbar[];
  navbarRepository : NavbarRepository;
  
  isAuthenticated : boolean = false;

  constructor(private authService : AuthService) {
    this.navbarRepository = new NavbarRepository();
    this.navbar = this.navbarRepository.getNavbar();
   }

  ngOnInit(): void {
    this.authService.user.subscribe(user =>{
      this.isAuthenticated = !!user;
    })
  }

  onLogout(){
    this.authService.logout();
  }

}
