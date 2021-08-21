import { AuthService } from '../auth.service';
import { User } from '../../users/entities/user.entity';

export class Auth {

    public authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService
    }

    async loginAndGetToken(user: User) {
        const result = await this.authService.login(user);
        user.token = result.token;
        return user;
    }
}
