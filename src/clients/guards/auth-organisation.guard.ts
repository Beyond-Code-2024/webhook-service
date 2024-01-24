import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OrganisationService } from '../services/organisation.service';

type jwtPayload = {
  organisation: string;
};

@Injectable()
export class AuthenticateOrganisationGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly organisationService: OrganisationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'] as string;
    if (!auth) {
      throw new UnauthorizedException();
    }
    const jwtToken = auth.split('Bearer ')[1];
    let organisationId: string;
    try {
      const payload: jwtPayload = await this.jwtService.verifyAsync(jwtToken);
      organisationId = payload.organisation;
    } catch (exception: unknown) {
      throw new UnauthorizedException('invalid jwt');
    }
    const organisation =
      await this.organisationService.findOrganisationById(organisationId);
    if (!organisation) {
      console.log('organisation not found');
      throw new UnauthorizedException('invalid jwt');
    }

    request.res.locals.organisation = {
      _id: organisation._id,
      name: organisation.name,
    };

    return true;
  }
}
