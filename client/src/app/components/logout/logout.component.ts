import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router,
              private _authenticationService: AuthenticationService) {
  }

  public ngOnInit(): void {
    // reset login status
    this._authenticationService.logout();
  }

  public logout() {
    this._authenticationService.logout();
    this._router.navigate(['./login']);
  }
}
