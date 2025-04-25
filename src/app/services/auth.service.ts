import {Injectable} from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable, tap} from 'rxjs';
import {RestClientService} from './rest-client.service';
import {UrlFactoryService} from './url-factory.service';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {LoginResultDto} from '../dto/login-result.dto';
import {LocalService} from './local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private connectedUserSubject = new BehaviorSubject<User | null>(null);
  public connectedUser$ = this.connectedUserSubject.asObservable();

  constructor(private restClient: RestClientService,
              private urlFactory: UrlFactoryService,
              private localService: LocalService,
              private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const email = this.extractEmailFromToken(this.localService.getData('authToken'));
    if (email) {
      this.connectedUserSubject.next(new User(email));
    }
  }

  isAuthenticated(): boolean {
    return this.connectedUserSubject.value !== null;
  }

  login(email: string): Observable<LoginResultDto> {
    return this.restClient.post<LoginResultDto>(this.urlFactory.getLoginUrl(email), {}).pipe(
      tap(token => this.saveUser(token))
    );
  }

  logout(): void {
    this.localService.removeData('authToken');
    this.connectedUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  async requireUser(): Promise<User | null> {
    const user = await firstValueFrom(this.connectedUser$);
    if (!user) {
      this.logout();
    }
    return user;
  }

  private saveUser(loginResultDto: LoginResultDto): void {
    this.localService.saveData('authToken', loginResultDto.token);
    const email = this.extractEmailFromToken(loginResultDto.token);
    if (email === null) {
      return this.logout();
    }
    this.connectedUserSubject.next(new User(email));
  }

  private extractEmailFromToken(token: string): string {
    return token; // TODO actuellement il n'y a pas vraiment de token / token = email
  }
}
